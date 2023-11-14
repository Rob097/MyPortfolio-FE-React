import DraggableBox from '@/components/draggableBox';
import PeopleFilters from '@/components/whiteBar/peopleFilters';
import { Sort, View } from '@/models/criteria.model';
import { UserQ } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';
import { Avatar, Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const filtersDefaultValues = {
    name: null,
    location: 'All',
    experience: 'All',
    industry: 'All'
};

const People = (props) => {
    const methods = useForm({ defaultValues: filtersDefaultValues });
    const [statisticsBy, setStatisticsBy] = useState('industry');
    const [statisticsData, setStatisticsData] = useState([]);

    useEffect(() => {
        console.log("test");
        if (statisticsBy === 'industry') {
            setStatisticsData(props.users?.map((user => user.profession))?.filter((value, index, self) => self.indexOf(value) === index).map((profession, index) => {
                return { id: index, value: props.users?.filter((user) => user.profession === profession).length, label: profession }
            }
            ));
        } else if (statisticsBy === 'skill') {
            setStatisticsData(props.users?.map((user => user.skills?.filter((userSkill) => userSkill.isMain).map((userSkill) => userSkill.skill.name)))?.flat()?.filter((value, index, self) => self.indexOf(value) === index).map((skill, index) => {
                return { id: index, value: props.users?.filter((user) => user.skills?.filter((userSkill) => userSkill.isMain).map((userSkill) => userSkill.skill.name).includes(skill)).length, label: skill }
            }
            ));
        }
    }, [statisticsBy, props.users]);

    async function handleFilters(data) {
        console.log(data);
    }

    const pieParams = {
        innerRadius: 30,
        outerRadius: 100,
        paddingAngle: 5,
        cornerRadius: 5,
        cx: 150,
        cy: 150
    };

    return (
        <Container className="pt-20 text-center large" maxWidth="xl" >
            <Typography variant="h1" fontWeight='bold' color='primary'><span className="text-black">Explore</span> People</Typography>

            <FormProvider {...methods}>
                <PeopleFilters handleFilters={handleFilters} filtersDefaultValues={filtersDefaultValues} />
            </FormProvider>

            {/* {JSON.stringify(props?.users)} */}

            <Grid container spacing={2} className='mt-20'>

                <Grid item xs={12} lg={9} className='flex justify-center '>

                    {/* for each user: */}
                    {props.users?.map((user) => (
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
                </Grid>

                <Grid item xs={12} lg={3}>

                    {/* Grafico circolare per rappresentare il numero di utenti per industria o per skill */}
                    <Box className="w-ful h-full bg-white border rounded-lg z-10 relative">
                        <Box className="flex flex-row justify-between items-center px-8 py-4">
                            <Typography variant="h5" fontWeight='bold' color='black'>Statistics</Typography>
                        </Box>
                        <Box className="flex flex-row justify-end mr-2">
                            <Button variant="outlined" color="primary" size="small" className='h-fit mr-2 whitespace-nowrap rounded-full' onClick={() => setStatisticsBy('industry')}>
                                By industry
                            </Button>
                            <Button variant="outlined" color="primary" size="small" className='h-fit rounded-full' onClick={() => setStatisticsBy('skill')}>
                                By skill
                            </Button>
                        </Box>

                        <Box className='w-fit mx-auto'>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            ...statisticsData
                                        ],
                                        ...pieParams
                                    },
                                ]}
                                height={400}
                                width={'fit-content'}
                                sx={{ minWidth: '100%', minHeight: '100%' }}
                                slotProps={{
                                    legend: {
                                        hidden: true,
                                        direction: 'row',
                                        position: { vertical: 'bottom', horizontal: 'middle' },
                                        padding: 10,
                                    },
                                }}
                            />
                        </Box>


                    </Box>
                </Grid>

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
        const firstTenUsersResponse = await fetcher(firstTenUsersUrl);

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
            revalidate: revalidate
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