import { SkillQ } from '@/models/skill.model';
import { SkillService } from "@/services/skill.service";
import Search from '@mui/icons-material/Search';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';
import { Criteria, Operation, View } from 'shared/utilities/criteria';
import { displayMessages } from '../alerts';

const NewSkill = ({ afterCreationAction }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [searchedCategories, setSearchedCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories(query) {
        const categoryName = new Criteria(SkillQ.skillName, Operation.equals, "*" + query?.replace(" ", "*") + "*");

        const criterias = query ? [categoryName] : null;
        const filters = new SkillQ(criterias, View.verbose, 0, 5, null);
        SkillService.getCategoriesByCriteria(filters).then((response) => {
            const categories = response?.content;
            setSearchedCategories(categories);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function myHandleSubmit(data) {
        try {
            manuallyIncrementPromiseCounter();
            if (!data.category.id) {
                const category = await SkillService.createCategory(data.category);
                data.category = category?.content;
            }

            const skill = await SkillService.create(data);
            if (afterCreationAction) {
                afterCreationAction(skill?.content);
            }

            reset();
            displayMessages([{ text: "Skill created successfully", level: "success" }]);

        } catch (error) {
            console.error(error);
        } finally {
            manuallyDecrementPromiseCounter();
        }
    }

    return (
        <>

            <Box sx={{ mt: 1 }} className="flex flex-wrap gap-4">
                <TextField
                    autoComplete="name"
                    name="name"
                    required
                    id="name"
                    label="Skill Name"
                    autoFocus
                    {...register("name", { required: true })}
                />
                <Autocomplete
                    id="categories"
                    {...register("category", { required: true })}
                    freeSolo
                    options={searchedCategories}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    onInputChange={debounce((e, value) => fetchCategories(value), 500)}
                    filterOptions={(options, params) => {
                        const filtered = options.filter((option) =>
                            option.name.toLowerCase().includes(params.inputValue.toLowerCase())
                        );

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search categories"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                ...params.inputProps,
                                className: params.inputProps.className + " !w-auto",
                            }}
                        />
                    )}
                    renderOption={(props, option) => <li {...props}>{option?.name}</li>}
                    isOptionEqualToValue={(option, value) => option?.name === value?.name}
                    onChange={(e, value) => {
                        if (typeof value === 'string') {
                            setValue('category', { name: value });
                        } else if (value && value.inputValue) {
                            setValue('category', { name: value.inputValue });
                        } else {
                            setValue('category', value);
                        }

                    }}
                />

                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(myHandleSubmit)}
                >
                    Add
                </Button>

            </Box>

        </>
    );
};

export default NewSkill;