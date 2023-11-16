import WhiteBar from '@/components/whiteBar';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Controller, useFormContext } from 'react-hook-form';

const PeopleFilters = ({ handleFilters, people, filtersDefaultValues }) => {

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
                        <Typography variant="overline" fontWeight='bold' color='primary' className='mb-2 cursor-pointer' onClick={() => { methods.reset(filtersDefaultValues); handleChange(); }}>Clear Filters</Typography>
                    </Box>
                }
                <Box className='flex flex-col md:flex-row md:divide-x w-full items-center justify-center space-y-4 xl:space-y-0 flex-wrap'>
                    <Box className='flex items-center justify-center md:justify-start md:pr-4'>
                        <TextField
                            {...methods.register("name", { onChange: handleChange })}
                            sx={{ minWidth: 150 }}
                            placeholder={"Name"}
                            label="Search"
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
                    <Box className='flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start md:pl-4 space-y-4 md:space-y-0'>
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
                                        >Location</InputLabel>
                                        <Select
                                            {...methods.register("location", { onChange: handleChange })}
                                            labelId="location-select-label"
                                            id="location-select"
                                            label="Location"
                                            size="small"
                                            className='text-left'
                                            value={value}
                                        >
                                            <MenuItem value={'All'}><em>All</em></MenuItem>

                                            {people?.map((person, index) => (
                                                <MenuItem key={'location-' + index} value={person.address?.nation}>{person.address?.nation}</MenuItem>
                                            ))}

                                        </Select>
                                    </>
                                )}
                            />
                        </FormControl>

                        {/* <FormControl sx={{ minWidth: 150 }} className='md:ml-4'>
                            <Controller
                                name="experience"
                                control={methods.control}
                                render={({ field: { value } }) => (
                                    <>
                                        <InputLabel id="sort-select-label"
                                            sx={({ palette: { text }, functions: { rgba } }) => ({
                                                color: rgba(text.main, 0.9),
                                            })}
                                        >Experience</InputLabel>
                                        <Select
                                            {...methods.register("experience", { onChange: handleChange })}
                                            labelId="experience-select-label"
                                            id="experience-select"
                                            label="Experience"
                                            size="small"
                                            className='text-left'
                                            value={value}
                                        >
                                            <MenuItem value={'All'}><em>All</em></MenuItem>
                                            <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                                            <MenuItem value={'Advanced'}>Advanced</MenuItem>
                                        </Select>
                                    </>
                                )}
                            />
                        </FormControl> */}

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
                                        >Industry</InputLabel>
                                        <Select
                                            {...methods.register("industry", { onChange: handleChange })}
                                            labelId="industry-select-label"
                                            id="industry-select"
                                            label="Industry"
                                            size="small"
                                            className='text-left'
                                            value={value}
                                        >
                                            <MenuItem value={'All'}><em>All</em></MenuItem>

                                            {people?.map((person, index) => (
                                                <MenuItem key={'industry-' + index} value={person.profession}>{person.profession}</MenuItem>
                                            ))}

                                        </Select>
                                    </>
                                )}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </WhiteBar>
    );
}

export default PeopleFilters;