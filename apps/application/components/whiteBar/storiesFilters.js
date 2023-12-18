import WhiteBar from '@/components/whiteBar';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Checkbox, Chip, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import _without from 'lodash/without';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ShowIf from '@/components/utils/showIf';

const filtersDefaultValues = {
    categories: [1, 2, 3],
    skills: [],
    name: '',
    sort: ''
};

const StoriesFilters = ({ emitFilters, skills, filtersToHide }) => {
    const { t } = useTranslation(['user-diary', 'user-home', 'common']);
    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitted } } = useForm();

    async function handleFilters(data) {
        emitFilters(data);
    }

    const categoriesMock = [
        { id: 1, name: t('categories.list.personal-experiences') },
        { id: 2, name: t('categories.list.personal-projects') },
        { id: 3, name: t('categories.list.personal-educations') },
    ];

    const [filterBy, setFilterBy] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [categories, setCategories] = useState(categoriesMock.map(({ id }) => id));

    const handleChange = (event) => {
        setFilterBy(event.target.value);
    };

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeSkills = (event) => {
        const {
            target: { value },
        } = event;
        setFilteredSkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleDeleteSkill = (e, value) => {
        e.preventDefault();
        setFilteredSkills((current) => _without(current, value));
    };

    const showCategories = (filtersToHide === undefined || filtersToHide.indexOf('categories') === -1);

    const resetFilters = () => {
        reset(filtersDefaultValues);
        handleFilters(filtersDefaultValues);
        setFilterBy('');
        setFilteredSkills([]);
        setCategories(categoriesMock.map(({ id }) => id));
    }


    return (
        <WhiteBar height={{ xs: "fit-content", md: "6rem" }} containerClasses='mt-12' flexDirection="column">
            {
                isSubmitted && isDirty &&
                <Box className="absolute w-fit flex self-end" >
                    <Typography variant="overline" fontWeight='bold' color='primary' className='mb-2 cursor-pointer' onClick={() => resetFilters() }>{t('filters.clear')}</Typography>
                </Box>
            }
            <Grid container className='items-center' component="form" role="form" onSubmit={handleSubmit((data) => handleFilters(data))}>

                <Grid item xs={12} lg={10} className='flex flex-col sm:flex-row justify-center md:justify-start items-center w-full h-full'>
                    <Box className='flex flex-col md:flex-row justify-center md:justify-start items-center'>

                        <ShowIf condition={showCategories}>
                            <Box className='md:ml-2'>
                                <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 300 }}>
                                    <InputLabel id="categories-select-label"
                                        sx={({ palette: { text }, functions: { rgba } }) => ({
                                            color: rgba(text.main, 0.9),
                                        })}
                                    >{t('categories.title')}</InputLabel>
                                    <Select
                                        {...register("categories", { required: showCategories ? 'Seleziona almeno una categoria' : false })}
                                        error={errors.categories !== undefined}
                                        labelId="categories-select-label"
                                        id="categories-select"
                                        multiple
                                        value={categories}
                                        label={t('categories.title')}
                                        onChange={handleChangeCategory}
                                        size="small"
                                        renderValue={(selected) => selected.length === categoriesMock.length ? t('categories.list.all') : categoriesMock.filter(({ id }) => selected.indexOf(id) > -1).map(({ name }) => name).join(', ')}
                                    >
                                        {categoriesMock.map(({ id, name }) => (
                                            <MenuItem key={'cate-' + id} value={id}>
                                                <Checkbox checked={categories.indexOf(id) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ShowIf>

                        <ShowIf condition={skills !== undefined && skills.length > 0 && (filtersToHide === undefined || filtersToHide.indexOf('skills') === -1)}>
                            <Box className="md:ml-2">
                                <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 300 }}>
                                    <InputLabel id="filters-by-skills-label"
                                        sx={({ palette: { text }, functions: { rgba } }) => ({
                                            color: rgba(text.main, 0.9),
                                        })}
                                    >{t('common:skills')}</InputLabel>
                                    <Select
                                        {...register("skills")}
                                        labelId="filters-by-skills-label"
                                        id="filters-by-skills"
                                        multiple
                                        value={filteredSkills}
                                        label={t('common:skills')}
                                        onChange={handleChangeSkills}
                                        size="small"
                                        renderValue={(selected) => (
                                            <Stack direction="row" spacing={1} className='overflow-x-hidden' >
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        id={value}
                                                        label={value}
                                                        clickable
                                                        deleteIcon={
                                                            <CancelIcon
                                                                onMouseDown={(event) => event.stopPropagation()}
                                                            />
                                                        }
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                        onDelete={(e) => handleDeleteSkill(e, value)}
                                                        onClick={() => console.log("clicked chip")} />
                                                ))}
                                            </Stack>
                                        )}
                                    >
                                        {skills?.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ShowIf>
                    </Box>

                    <Box className='flex flex-col md:flex-row justify-center md:justify-start items-center'>

                        <ShowIf condition={filtersToHide === undefined || filtersToHide.indexOf('name') === -1}>
                            <Box className="md:ml-2">
                                <TextField placeholder={t('filters.by-name')} size="small" className='my-2' variant="outlined" {...register('name')} />
                            </Box>
                        </ShowIf>

                        <ShowIf condition={filtersToHide === undefined || filtersToHide.indexOf('sort') === -1}>
                            <Box className="md:ml-2">
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="sort-select-label"
                                        sx={({ palette: { text }, functions: { rgba } }) => ({
                                            color: rgba(text.main, 0.9),
                                        })}
                                    >{t('sort.title')}</InputLabel>
                                    <Select
                                        {...register("sort")}
                                        labelId="sort-select-label"
                                        id="sort-select"
                                        value={filterBy}
                                        label={t('sort.title')}
                                        onChange={handleChange}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>{t('sort.list.none')}</em>
                                        </MenuItem>
                                        <MenuItem value={'dateUp'}>{t('sort.list.dateUp')}</MenuItem>
                                        <MenuItem value={'dateDown'}>{t('sort.list.dateDown')}</MenuItem>
                                        <MenuItem value={'name'}>{t('sort.list.name')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </ShowIf>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={2} className='flex justify-center lg:justify-end items-center w-full h-full'>
                    <Box className="h-full flex items-center">
                        <Button type='submit' variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }} className='text-white'>{t('filters.apply')}</Button>
                    </Box>
                </Grid>
                <ShowIf condition={errors !== undefined}>
                    <Box className='ml-4'>
                        <FormHelperText error={errors !== undefined}>{Object.keys(errors).filter(key => errors[key].message).map(key => errors[key].message).join(', ')}</FormHelperText>
                    </Box>
                </ShowIf>
            </Grid>
        </WhiteBar>
    )
}

export default StoriesFilters