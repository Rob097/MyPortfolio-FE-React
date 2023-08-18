import WhiteBar from '@/components/whiteBar';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import _without from 'lodash/without';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import tailwindConfig from '@/tailwind.config.js';


const StoriesFilters = () => {
    const { t } = useTranslation(['user-diary', 'user-home', 'common']);
    const { colors } = tailwindConfig.theme;

    const skills = [
        'Angular',
        'React',
        'Vue',
        'Java',
        'Spring boot',
        'Docker',
        'Kubernetes'
    ];

    const categoriesMock = [
        { id: 1, name: t('categories.list.professional-experiences') },
        { id: 2, name: t('categories.list.personal-projects') },
        { id: 3, name: t('categories.list.educations') },
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
    

    return (
        <WhiteBar height={{ xs: "fit-content", md: "6rem" }} containerClasses='mt-12'>
            <Grid container className='items-center'>
                <Grid item xs={12} lg={10} className='flex flex-col sm:flex-row justify-center md:justify-start items-center w-full h-full'>
                    <Box className='flex flex-col md:flex-row justify-center md:justify-start items-center'>
                        <Box className='md:ml-2'>
                            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 300 }}>
                                <InputLabel id="categories-select-label"
                                    sx={({ palette: { text }, functions: { rgba } }) => ({
                                        color: rgba(text.main, 0.9),
                                    })}
                                >{t('categories.title')}</InputLabel>
                                <Select
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
                        <Box className="md:ml-2">
                            <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 300 }}>
                                <InputLabel id="filters-by-skills-label"
                                    sx={({ palette: { text }, functions: { rgba } }) => ({
                                        color: rgba(text.main, 0.9),
                                    })}
                                >{t('common:skills')}</InputLabel>
                                <Select
                                    labelId="filters-by-skills-label"
                                    id="filters-by-skills"
                                    multiple
                                    value={filteredSkills}
                                    label={t('common:skills')}
                                    onChange={handleChangeSkills}
                                    size="small"
                                    renderValue={(selected) => (
                                        <Stack direction="row" spacing={1} width={'95%'} >
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
                                    {skills.map((name) => (
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
                    </Box>
                    <Box className='flex flex-col md:flex-row justify-center md:justify-start items-center'>
                        <Box className="md:ml-2">
                            <TextField placeholder={t('filters.by-name')} size="small" className='my-2' variant="outlined" />
                        </Box>
                        <Box className="md:ml-2">
                            <FormControl sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel id="sort-select-label"
                                    sx={({ palette: { text }, functions: { rgba } }) => ({
                                        color: rgba(text.main, 0.9),
                                    })}
                                >{t('sort.title')}</InputLabel>
                                <Select
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
                    </Box>
                </Grid>
                <Grid item xs={12} lg={2} className='flex justify-center lg:justify-end items-center w-full h-full'>
                    <Box className="h-full flex items-center">
                        <Button variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }} className='whitespace-nowrap text-white'>{t('filters.apply')}</Button>
                    </Box>
                </Grid>
            </Grid>
        </WhiteBar>
    )
}

export default StoriesFilters