import Snack from "@/components/alerts/snack";
import CustomPieChart from '@/components/charts/pieChart';
import DraggableBox from '@/components/draggableBox';
import Loading from '@/components/utils/loading/loading';
import PeopleFilters from '@/components/whiteBar/peopleFilters';
import { Criteria, Operation, Sort, View } from '@/models/criteria.model';
import { UserQ } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';
import { Avatar, Box, Button, Chip, Container, Grid, Pagination, Typography } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const filtersDefaultValues = {
    name: null,
    location: 'All',
    industry: 'All'
};

const numberPerPage = 10;

const People = (props) => {

    /******************/
    /*     STATES     */
    /******************/
    const methods = useForm({ defaultValues: filtersDefaultValues });
    const [statisticsBy, setStatisticsBy] = useState('industry');
    const [statisticsData, setStatisticsData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(props.number);
    const [users, setUsers] = useState(props.users);
    const [filters, setFilters] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [sideWidth, setSideWidth] = useState(0)
    let sideRef = useRef()

    // Tracker attività API
    const { promiseInProgress } = usePromiseTracker();


    /******************/
    /*     EFFECTS    */
    /******************/

    //keep trace of lateralSectionDiv width to pass it to the pie chart
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setSideWidth(entries[0].contentRect.width)
        })
        observer.observe(sideRef.current)
        return () => sideRef.current && observer.unobserve(sideRef.current)
    }, []);

    useEffect(() => {
        updateStatistics();
    }, [statisticsBy, users]);

    useEffect(() => {
        if (filters && filters !== filtersDefaultValues) {
            const delayDebounceFn = setTimeout(() => {
                trackPromise(
                    UserService.getByCriteria(filters, true)
                        .then((response) => {
                            setUsers(response?.content);
                            setTotalUsers(response?.headers?.get('number'));
                        })
                        .catch(error => {
                            Snack.error(error);
                        })
                );
            }, 700)



            return () => clearTimeout(delayDebounceFn)
        }
    }, [filters])


    /******************/
    /*     METHODS    */
    /******************/

    function updateStatistics() {
        if (statisticsBy === 'industry') {
            setStatisticsData(users?.map((user => user.profession))?.filter((value, index, self) => self.indexOf(value) === index).map((profession, index) => {
                return { id: index, value: users?.filter((user) => user.profession === profession).length, label: profession }
            }
            ));
        } else if (statisticsBy === 'skill') {
            setStatisticsData(
                users?.map((user => user.skills?.filter((userSkill) => userSkill.isMain).map((userSkill) => userSkill.skill.name)))?.flat()?.filter((value, index, self) => self.indexOf(value) === index).map((skill, index) => {
                    return { id: index, value: users?.filter((user) => user.skills?.filter((userSkill) => userSkill.isMain).map((userSkill) => userSkill.skill.name).includes(skill)).length, label: skill }
                })
            );
        }
    }

    // When going to the next page, fetch the next 10 users and add them to the users array.
    // if the user array already contains the number of users of "numberPerPage"*"page" then don't fetch anything and just show the users already fetched.
    function handlePagination(event, page) {
        if (Math.ceil(users?.length / numberPerPage) < page) {
            const internalFilters = filters;
            internalFilters.page = page - 1;
            trackPromise(
                UserService.getByCriteria(filters)
                    .then((response) => {
                        const newUsersWithoutDuplicates = response?.content?.filter((user) => !users?.map((user) => user.id).includes(user.id));
                        setUsers([...users, ...newUsersWithoutDuplicates]);
                    })
                    .catch(error => {
                        Snack.error(error);
                    })
                    .finally(() => {
                        setCurrentPage(page - 1);
                    })
            );
        } else {
            setUsers(users?.slice(0, numberPerPage * page));
            setCurrentPage(page - 1);
        }
    }

    async function handleFilters(data) {
        const fullNameCriteria = new Criteria(UserQ.firstName + " " + UserQ.lastName, Operation.equals, "*" + data.name?.replace(" ", "*") + "*");
        const professionCriteria = new Criteria(UserQ.profession, Operation.equals, data.industry);
        const nationCriteria = new Criteria(UserQ.nation, Operation.equals, data.location);

        const criterias = [];
        data.name && criterias.push(fullNameCriteria);
        data.industry && data.industry !== 'All' && criterias.push(professionCriteria);
        data.location && data.location !== 'All' && criterias.push(nationCriteria);
        const internalFilters = new UserQ(criterias, View.verbose, 0, numberPerPage, new Sort(UserQ.createdAt, 'DESC'));
        setFilters(internalFilters);
    }


    /******************/
    /*     RENDER     */
    /******************/

    return (
        <Container className="pt-20 text-center large" maxWidth="xl" >
            <Typography variant="h1" fontWeight='bold' color='primary'><span className="text-black">Explore</span> People</Typography>

            <FormProvider {...methods}>
                <PeopleFilters handleFilters={handleFilters} people={users} filtersDefaultValues={filtersDefaultValues} />
            </FormProvider>

            <Grid container spacing={2} className='relative my-10 py-10 px-2'>

                <Grid item xs={12} lg={9} className='flex flex-col items-center justify-between'>

                    <Box className="w-full flex flex-col justify-start items-center">
                        {/* for each user of the current page: */}
                        {
                            users?.filter((user, index) => index < numberPerPage * (currentPage + 1) && index >= numberPerPage * currentPage)?.length <= 0 ? <h1>No people found</h1> :
                                users?.filter((user, index) => index < numberPerPage * (currentPage + 1) && index >= numberPerPage * currentPage).map((user) => (
                                    <Box key={user.id} className="w-full max-w-sm md:max-w-full md:h-36 h-fit bg-white border rounded-lg mb-4 py-4 md:py-0 flex flex-col md:flex-row text-center md:text-start items-center px-8 z-10 relative">
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="/images/profileImage.JPG"
                                            sx={{ width: 70, height: 70 }}
                                        />
                                        <Box className="ml-4 ">
                                            <Typography variant="h5" fontWeight='bold' color='black'>{`${user?.firstName} ${user?.lastName}`}</Typography>
                                            <Box className='flex flex-col md:flex-row md:divide-x-2'>
                                                <Typography variant="body2" color='black' paddingRight={2}>{user?.address?.nation}</Typography>
                                                <Typography variant="body2" color='black' paddingLeft={2}>{user?.profession}</Typography>
                                            </Box>
                                            {user.skills?.length > 0 &&
                                                <DraggableBox noDrag>
                                                    {user.skills?.filter((userSkill) => userSkill.isMain)
                                                        .sort((a, b) => a.orderId - b.orderId)
                                                        .map((userSkill) => (
                                                            <Chip key={"skill-" + user.id + "-" + userSkill.skill.id} id={"skill-" + user.id + "-" + userSkill.skill.id} label={userSkill.skill.name} />
                                                        ))}
                                                </DraggableBox>
                                            }
                                        </Box>

                                        <Box display={{ xs: 'none', xl: 'flex' }} className="ml-auto flex-col justify-between">
                                            <Box className="flex flex-col justify-between">
                                                <Box className="flex flex-row justify-between">
                                                    <Typography variant="body2" color='black' paddingRight={2}>Projects</Typography>
                                                    <Typography variant="h5" fontWeight='bold' color='black'>{user?.projects?.length}</Typography>
                                                </Box>
                                                <Box className="flex flex-row justify-between">
                                                    <Typography variant="body2" color='black' paddingRight={2}>Experiences</Typography>
                                                    <Typography variant="h5" fontWeight='bold' color='black'>{user?.experiences?.length}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="mx-auto md:mx-0 md:ml-auto mt-4 md:mt-0 flex flex-col justify-between">
                                            <Box className="flex flex-row justify-between">
                                                <Link href={`/users/${user.slug}/home`}>
                                                    <Button variant="outlined" color="primary" size="small" className='h-fit py-2 mr-2 whitespace-nowrap'>
                                                        View profile
                                                    </Button>
                                                </Link>
                                                <Button variant="contained" color="primary" size="small" className='h-fit py-2'>
                                                    Connect
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>

                                ))}
                    </Box>

                    <Box className="w-full flex flex-row justify-start items-end">
                        <Pagination
                            count={Math.ceil(totalUsers / numberPerPage)}
                            variant="outlined"
                            color="primary"
                            className='relative z-10'
                            onChange={handlePagination}
                        />
                    </Box>
                </Grid>

                <Grid ref={sideRef} item xs={12} lg={3}>

                    {/* Grafico circolare per rappresentare il numero di utenti per industria o per skill */}
                    <Box className="w-ful h-fit bg-white border rounded-lg z-10 relative">
                        <Box className="flex flex-row py-4 justify-between flex-wrap">
                            <Box className="flex justify-start items-center ml-4">
                                <Typography variant="h5" fontWeight='bold' color='black'>Statistics</Typography>
                            </Box>
                            <Box className="flex justify-end items-center mr-2">
                                <Button variant="outlined" color="primary" size="small" className='h-fit mr-2 whitespace-nowrap rounded-full' onClick={() => setStatisticsBy('industry')}>
                                    By industry
                                </Button>
                                <Button variant="outlined" color="primary" size="small" className='h-fit rounded-full' onClick={() => setStatisticsBy('skill')}>
                                    By skill
                                </Button>
                            </Box>
                        </Box>

                        <Box className='w-fit mx-auto'>
                            <CustomPieChart
                                data={...statisticsData}
                                width={sideWidth}
                                height={400}
                            />
                        </Box>


                    </Box>
                </Grid>

                {promiseInProgress && <Loading adaptToComponent />}

            </Grid>

        </Container>
    );
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    try {
        const { locale } = context

        const filters = new UserQ(null, View.verbose, 0, 10, new Sort(UserQ.createdAt, 'DESC'));
        const firstTenUsersUrl = UserService.getByCriteriaUrl(filters);
        const firstTenUsersResponse = await fetcher(firstTenUsersUrl, true);

        if (!firstTenUsersResponse?.content) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            users: firstTenUsersResponse?.content,
            messages: firstTenUsersResponse?.messages,
            revalidate: revalidate,
            isEmpty: firstTenUsersResponse.headers?.get('is-empty'),
            isLast: firstTenUsersResponse.headers?.get('is-last'),
            number: firstTenUsersResponse.headers?.get('number')
        }

    } catch (error) {
        console.log(error);
        props = {
            error: JSON.parse(JSON.stringify(error))
        }
    }

    return {
        props,
        revalidate
    }

}

export default People;