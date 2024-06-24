import Snack from "@/components/alerts/snack";
import HorizontalCard from "@/components/cards/horizontalCard";
import SquareCard from "@/components/cards/squareCard";
import CustomPieChart from '@/components/charts/pieChart';
import Loading from '@/components/utils/loading/loading';
import ShowIf from '@/components/utils/showIf';
import PeopleFilters from '@/components/whiteBar/peopleFilters';
import { Criteria, Operation, Sort, View } from '@/models/criteria.model';
import { UserQ } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from 'react-hook-form';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const filtersDefaultValues = {
    name: null,
    location: 'All',
    industry: 'All'
};

const numberPerPage = 10;

const People = (props) => {
    const { t } = useTranslation(['explore', 'user-diary', 'user-home']);

    /******************/
    /*     STATES     */
    /******************/
    const methods = useForm({ defaultValues: filtersDefaultValues });
    const [layout, setLayout] = useState('list');
    const [statisticsBy, setStatisticsBy] = useState('skill');
    const [statisticsData, setStatisticsData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(props.number);
    const [users, setUsers] = useState(props.users);
    const [visibleUsers, setVisibleUsers] = useState(props.users);
    const [filters, setFilters] = useState(new UserQ([new Criteria(UserQ.diaries, Operation.greaterThan, 1)], View.verbose, 0, numberPerPage, new Sort(UserQ.updatedAt, 'DESC')));
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

    useEffect(() => {
        setVisibleUsers(users?.filter((user, index) => index < numberPerPage * (currentPage + 1) && index >= numberPerPage * currentPage));
    }, [currentPage, users])


    /******************/
    /*     METHODS    */
    /******************/

    function updateStatistics() {
        if (statisticsBy === 'industry') {
            const data = users?.map(user => user.profession)
                ?.filter((value, index, self) => self.indexOf(value) === index)
                ?.map((profession, index) => ({
                    id: index,
                    value: users?.filter(user => user.profession === profession)?.length,
                    label: truncateLabel(profession)
                }));

            setStatisticsData(processData(data));
        } else if (statisticsBy === 'skill') {
            const data = users?.map(user => user.skills?.filter(userSkill => userSkill.isMain).map(userSkill => userSkill.skill.name))
                ?.flat()
                ?.filter((value, index, self) => self.indexOf(value) === index)
                ?.map((skill, index) => ({
                    id: index,
                    value: users?.filter(user => user.skills?.filter(userSkill => userSkill.isMain).map(userSkill => userSkill.skill.name).includes(skill))?.length,
                    label: truncateLabel(skill)
                }));

            setStatisticsData(processData(data));
        }
    }

    function processData(data) {
        // Sort data by value in descending order
        const sortedData = [...data].sort((a, b) => b.value - a.value);

        let results = sortedData;
        if (sortedData?.length > 5) {
            // Take the first 4 items
            const topData = sortedData.slice(0, 4);

            // Merge the rest into an "Other" category
            const otherData = {
                id: topData?.length,
                value: sortedData.slice(4).reduce((total, item) => total + item.value, 0),
                label: 'Other'
            };

            results = [...topData, otherData];
        }

        // Return the new data
        return results;
    }

    function truncateLabel(label) {
        return label?.length > 25 ? label.slice(0, 25) + '...' : label;
    }

    // When going to the next page, fetch the next 10 users and add them to the users array.
    // if the user array already contains the number of users of "numberPerPage"*"page" then don't fetch anything and just show the users already fetched.
    function handlePagination(event, page) {
        if (Math.ceil(users?.length / numberPerPage) < page) {
            const internalFilters = filters ?? new UserQ(null, View.verbose, 0, numberPerPage, new Sort(UserQ.updatedAt, 'DESC'));
            internalFilters.page = page - 1;
            trackPromise(
                UserService.getByCriteria(internalFilters)
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
            setCurrentPage(page - 1);
        }
    }

    async function handleFilters(data) {
        const diariesCriteria = new Criteria(UserQ.diaries, Operation.greaterThan, 1);
        const fullNameCriteria = new Criteria(UserQ.firstName + " " + UserQ.lastName, Operation.equals, "*" + data.name?.replace(" ", "*") + "*");
        const professionCriteria = new Criteria(UserQ.profession, Operation.equals, data.industry);
        const nationCriteria = new Criteria(UserQ.nation, Operation.equals, data.location);

        const criterias = [diariesCriteria];
        data.name && criterias.push(fullNameCriteria);
        data.industry && data.industry !== 'All' && criterias.push(professionCriteria);
        data.location && data.location !== 'All' && criterias.push(nationCriteria);
        const internalFilters = new UserQ(criterias, View.verbose, 0, numberPerPage, new Sort(UserQ.updatedAt, 'DESC'));
        setFilters(internalFilters);
    }


    /******************/
    /*     RENDER     */
    /******************/

    return (
        <>

            <Head>
                <title>{`MyPortfolio | ${t('people.explore-title')} ${t('people.people-title')}`}</title>
                <meta name="description" content={t('people.explore-description')} />
                <meta name="keywords" content="portfolio, people, explore, professionals, skills, industry, location" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Roberto Dellantonio" />
            </Head>

            <Container className="pt-20 text-center large" maxWidth="xl" >
                <Typography variant="h1" fontWeight='bold' color='primary' className="text-7xl"><span className="text-black">{t('people.explore-title')}</span> {t('people.people-title')}</Typography>

                <FormProvider {...methods}>
                    <PeopleFilters handleFilters={handleFilters} people={users} filtersDefaultValues={filtersDefaultValues} currentLayout={layout} setLayout={setLayout} />
                </FormProvider>

                <Grid container spacing={2} className='relative my-10 py-10 px-2'>

                    <Grid item xs={12} lg={9} className='flex flex-col items-center justify-between'>

                        <ShowIf condition={layout === 'list'}>
                            <Box className="w-full flex flex-col justify-start items-center">
                                {
                                    visibleUsers?.length <= 0 ? <h1>{t('people.no-results')}</h1> :
                                        visibleUsers.map((user) => (
                                            <HorizontalCard
                                                key={'list-' + user.id}
                                                id={user.id}
                                                image={JSON.parse(user?.customizations)?.profileImage ?? '/images/default-profile-image.webp'}
                                                title={`${user?.firstName} ${user?.lastName}`}
                                                firstSubtitle={user?.address?.nation}
                                                secondSubtitle={user?.profession}
                                                chips={user.skills?.filter((userSkill) => userSkill.isMain).sort((a, b) => a.orderId - b.orderId).map((userSkill) => userSkill.skill)}
                                                buttons={[{ label: t('people.view-profile'), link: `/users/${user.slug}/home` }, { label: t('user-home:contact-me.title'), link: `/users/${user.slug}/home#contact-section` }]}
                                            >
                                                {/* <Box className="flex flex-col justify-between">
                                                    <Box className="flex flex-row justify-between">
                                                        <Typography variant="body2" color='black' paddingRight={2}>{t('user-diary:categories.list.projects')}:</Typography>
                                                        <Typography variant="h5" fontWeight='bold' color='black'>{user?.projects?.length}</Typography>
                                                    </Box>
                                                    <Box className="flex flex-row justify-between">
                                                        <Typography variant="body2" color='black' paddingRight={2}>{t('user-diary:categories.list.experiences')}:</Typography>
                                                        <Typography variant="h5" fontWeight='bold' color='black'>{user?.experiences?.length}</Typography>
                                                    </Box>
                                                </Box> */}
                                            </HorizontalCard>
                                        ))}
                            </Box>
                        </ShowIf>

                        <ShowIf condition={layout === 'grid'}>
                            <Box className={"w-full flex flex-row flex-wrap items-start justify-center"}>
                                {
                                    visibleUsers?.length <= 0 ? <h1>{t('people.no-results')}</h1> :
                                        visibleUsers.map((user) => (
                                            <SquareCard
                                                key={'grid-' + user.id}
                                                id={user.id}
                                                image={JSON.parse(user?.customizations)?.profileImage}
                                                title={`${user?.firstName} ${user?.lastName}`}
                                                subtitle={user?.profession}
                                                description={user?.presentation}
                                                chips={user.skills?.filter((userSkill) => userSkill.isMain).sort((a, b) => a.orderId - b.orderId).map((userSkill) => userSkill.skill)}
                                                bottomCaption={user?.address?.nation}
                                                buttons={[{ label: t('people.view-profile'), link: `/users/${user.slug}/home` }, { label: t('user-home:contact-me.title'), link: `/users/${user.slug}/home#contact-section` }]}
                                            />
                                        ))}
                            </Box>
                        </ShowIf>

                        <Box className="w-full flex flex-row justify-start items-end my-10">
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
                                    <Typography variant="h5" fontWeight='bold' color='black'>{t('people.statistics.title')}</Typography>
                                </Box>
                                <Box className="flex justify-end items-center mr-2">
                                    <Button variant={statisticsBy === 'industry' ? "contained" : "outlined"} color="primary" size="small" className='h-fit mr-2 whitespace-nowrap rounded-full' onClick={() => setStatisticsBy('industry')}>
                                        {t('people.statistics.by-industry')}
                                    </Button>
                                    <Button variant={statisticsBy === 'skill' ? "contained" : "outlined"} color="primary" size="small" className='h-fit rounded-full' onClick={() => setStatisticsBy('skill')}>
                                        {t('people.statistics.by-skill')}
                                    </Button>
                                </Box>
                            </Box>

                            <Box className='w-fit mx-auto'>
                                <ErrorBoundary onError={error => console.log("ERROR PIE CHART: ", error)} fallback={<CustomPieChart data={statisticsData} width={sideWidth} height={400} />}>
                                    <CustomPieChart
                                        data={statisticsData}
                                        width={sideWidth}
                                        height={400}
                                    />
                                </ErrorBoundary>
                            </Box>


                        </Box>
                    </Grid>

                    {promiseInProgress && <Loading adaptToComponent />}

                </Grid>

            </Container>
        </>
    );
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    try {
        const { locale } = context

        const diariesCriteria = new Criteria(UserQ.diaries, Operation.greaterThan, 1);
        const criterias = [diariesCriteria];
        const filters = new UserQ(criterias, View.verbose, 0, 10, new Sort(UserQ.updatedAt, 'DESC'));
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