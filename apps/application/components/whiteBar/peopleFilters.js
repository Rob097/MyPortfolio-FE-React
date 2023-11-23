import WhiteBar from '@/components/whiteBar';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const PeopleFilters = ({ handleFilters, people, filtersDefaultValues, currentLayout, setLayout }) => {
    const { t } = useTranslation(['explore', 'user-diary']);

    const methods = useFormContext({
        defaultValues: filtersDefaultValues
    });

    const handleChange = methods.handleSubmit((data) => handleFilters(data));

    return (
        <WhiteBar height={{ xs: "fit-content" }} containerClasses='mt-12 !max-w-fit'>
            <Box className="w-full flex flex-col" >
                {
                    methods.formState.isDirty &&
                    <Box className="w-fit flex self-end" >
                        <Typography variant="overline" fontWeight='bold' color='primary' className='mb-2 cursor-pointer' onClick={() => { methods.reset(filtersDefaultValues); handleChange(); }}>{t('people.filters.clear')}</Typography>
                    </Box>
                }
                <Box className='flex flex-col md:flex-row md:divide-x w-full items-center justify-center space-y-4 xl:space-y-0 flex-wrap'>
                    <Box className='flex items-center justify-center md:justify-start md:pr-4'>
                        <TextField
                            {...methods.register("name", { onChange: handleChange })}
                            sx={{ minWidth: 150 }}
                            placeholder={t('people.filters.search-placeholder')}
                            label={t('people.filters.search')}
                            size="small"
                            variant="outlined"
                            className="customInputLabel"
                            type="search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box className='flex flex-col md:flex-row justify-center items-center md:justify-start md:pl-4 space-y-4 md:space-y-0'>
                        <FormControl sx={{ minWidth: 150 }}>
                            <Controller
                                name="location"
                                control={methods.control}
                                render={({ field: { value } }) => (
                                    <>
                                        <InputLabel id="sort-select-label"
                                            sx={({ palette: { text }, functions: { rgba } }) => ({
                                                color: rgba(text.main, 0.9),
                                            })}
                                        >{t('people.filters.location')}</InputLabel>
                                        <Select
                                            {...methods.register("location", { onChange: handleChange })}
                                            labelId="location-select-label"
                                            id="location-select"
                                            label={t('people.filters.location')}
                                            size="small"
                                            className='text-left'
                                            value={value}
                                        >
                                            <MenuItem value={'All'}><em>{t('people.filters.all')}</em></MenuItem>

                                            {people?.map((person, index) => (
                                                <MenuItem key={'location-' + index} value={person.address?.nation}>{person.address?.nation}</MenuItem>
                                            ))}

                                        </Select>
                                    </>
                                )}
                            />
                        </FormControl>

                        <FormControl sx={{ minWidth: 150 }} className='md:ml-4'>
                            <Controller
                                name="industry"
                                control={methods.control}
                                render={({ field: { value } }) => (
                                    <>
                                        <InputLabel id="sort-select-label"
                                            sx={({ palette: { text }, functions: { rgba } }) => ({
                                                color: rgba(text.main, 0.9),
                                            })}
                                        >{t('people.filters.industry')}</InputLabel>
                                        <Select
                                            {...methods.register("industry", { onChange: handleChange })}
                                            labelId="industry-select-label"
                                            id="industry-select"
                                            label={t('people.filters.industry')}
                                            size="small"
                                            className='text-left'
                                            value={value}
                                        >
                                            <MenuItem value={'All'}><em>{t('people.filters.all')}</em></MenuItem>

                                            {people?.map((person, index) => (
                                                <MenuItem key={'industry-' + index} value={person.profession}>{person.profession}</MenuItem>
                                            ))}

                                        </Select>
                                    </>
                                )}
                            />
                        </FormControl>

                        <Tooltip title={currentLayout === 'grid' ? t('people.filters.layouts.list') : t('people.filters.layouts.grid')} placement="top">
                            <Button variant="contained" size="small" className='w-fit h-fit min-w-0 p-2 ml-4 whitespace-nowrap bg-primary-main text-white' onClick={() => setLayout(currentLayout === 'grid' ? 'list' : 'grid')}>
                                {currentLayout === 'list' && <GridViewIcon />}
                                {currentLayout === 'grid' && <ViewListIcon />}
                            </Button>
                        </Tooltip>

                    </Box>
                </Box>
            </Box>
        </WhiteBar>
    );
}

export default PeopleFilters;