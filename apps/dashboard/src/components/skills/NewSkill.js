import { SkillQ } from '@/models/skill.model';
import { SkillService } from "@/services/skill.service";
import { Add } from '@mui/icons-material';
import Search from '@mui/icons-material/Search';
import { Autocomplete, Box, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';
import { Criteria, Operation, View } from 'shared/utilities/criteria';
import { CustomTextField } from '../Custom/FormComponents';
import { displayMessages } from '../alerts';

const SKILLS_TO_DISPLAY = 5;
const NewSkill = ({ afterCreationAction }) => {
    const { register, handleSubmit, setValue, reset, formState } = useForm();
    const [searchedCategories, setSearchedCategories] = useState([]);
    const { t } = useTranslation("dashboard");

    async function fetchCategories(query) {
        const categoryName = new Criteria(SkillQ.skillName, Operation.equals, "*" + query?.replace(" ", "*") + "*");

        const criterias = query ? [categoryName] : null;
        const filters = new SkillQ(criterias, View.verbose, 0, SKILLS_TO_DISPLAY, null);
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
            displayMessages([{ text: t('skills.created-successfully'), level: "success" }]);

        } catch (error) {
            console.error(error);
        } finally {
            manuallyDecrementPromiseCounter();
        }
    }

    return (
        <>

            <Box sx={{ mt: 1 }} className="flex flex-wrap gap-4">
                <CustomTextField
                    autoComplete="name"
                    name="name"
                    required
                    id="name"
                    label={t('skills.name-label')}
                    autoFocus
                    {...register("name", { required: t('skills.name-required') })}
                    error={formState.errors.name !== undefined}
                    helperText={formState.errors.name?.message}
                    sx={{ width: { xs: '100%', sm: '33.33%' } }}
                />
                <Autocomplete
                    id="categories"
                    {...register("category", { required: t('skills.category-required') })}
                    classes={{ root: '!w-full sm:!w-auto' }}
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

                        if (params.inputValue === '' && filtered.length === 0) {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: t('skills.start-typing'),
                                disabled: true
                            });
                        }

                        if (params.inputValue === '' && filtered.length === SKILLS_TO_DISPLAY) {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: '...',
                                disabled: true
                            });
                        }

                        if (params.inputValue !== '' && !filtered.find((option) => option.name.toLowerCase() === params.inputValue.toLowerCase())) {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: t('skills.add-skill', { name: params.inputValue }),
                            });
                        }

                        return filtered;
                    }}
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}
                            error={formState.errors.category !== undefined}
                            helperText={formState.errors.category?.message}
                            placeholder={t('skills.category-placeholder')}
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
                    renderOption={(props, option) => (
                        <li {...props} style={{ cursor: option.disabled ? 'default' : 'pointer' }} onClick={(e) => {
                            if (!option.disabled) {
                                props.onClick(e);
                            } else {
                                return;
                            }
                        }
                        }>
                            {option.name}
                        </li>

                    )}
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
                    className='!w-full sm:!w-auto'
                    startIcon={<Add />}
                    sx={{ maxHeight: '60px' }}
                >
                    {t('labels.add')}
                </Button>

            </Box>

        </>
    );
};

export default NewSkill;