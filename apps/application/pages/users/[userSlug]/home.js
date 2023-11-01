import HeroSection from "@/components/sections/HeroSection";
import MainStorySection from '@/components/sections/MainStorySection';
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import UserTimeline from '@/components/timelines/userTimeline';
import ShowIf from '@/components/utils/showIf';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { User } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService, { useUser } from '@/services/user.service';
import tailwindConfig from '@/tailwind.config.js';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import userClasses from './styles/shared.module.scss';

const UserHome = () => {
    const router = useRouter();
    const { userSlug } = router.query;

    const { t } = useTranslation(['user-home', 'common']);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanXl = isGreaterThan('xl');

    const { user, isError } = useUser(userSlug, 'verbose');

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    const mainStory = useMemo(() => {
        return user?.diaries?.flatMap(diary => diary?.stories)?.find(story => story?.id === user?.mainStoryId);
    }, [user]);

    async function handleContact(data) {
        console.log(data);
    }

    return (
        <>
            {/* <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}> */}
            <HeroSection img="/images/SamplePhoto_12.jpg" buttons={[{ label: t('download-cv') }, { label: t('contact-me.title'), link: '#contact-section' }]}>
                <Typography variant="h3" color="primary" fontWeight="bold">{t("common:whoamI")}</Typography>
                <Typography variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: isGreaterThanXl ? '120%' : 'fit-content' }}>{user?.firstName} {user?.lastName}</Typography>
                <Typography variant="h5" color="dark" fontWeight="bold" gutterBottom>{user?.profession}</Typography>
                <Typography variant="subtitle1" color="text" gutterBottom>{user?.presentation}</Typography>
            </HeroSection>

            <ShowIf condition={user?.skills?.filter(skill => skill.isMain)?.length >= 3}>
                <MicroHighlightSection moveUp>
                    {
                        user?.skills
                            ?.filter(skill => skill.isMain)
                            ?.sort((a, b) => a.orderId - b.orderId)
                            ?.map((userSkill, index) => (
                                <SingleElement key={index} avatar={'' + userSkill.orderId} title={userSkill.skill.name} caption={userSkill.skill.category?.name} />
                            )
                            )
                    }

                </MicroHighlightSection>
            </ShowIf>

            <Box id='main-story-section' component='section' className='mt-12 mb-20 xl:mt-0'>
                <MainStorySection useContainer staticMainStory={mainStory} />
                {/* <PersonalCard image='https://mui.com/static/images/avatar/1.jpg' phone={user?.phone} email={user?.email} city={User.getUserAddress(user)} sectionToScrollTo='#contact-section' /> */}
            </Box>

            <Box id='user-timeline' component='section' className='flex flex-col justify-center mt-12 mb-20 xl:mt-0'>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column' }}>
                    {/* h3 */}
                    <Typography variant="h3" gutterBottom>
                        A quick overview
                    </Typography>
                    {/* link to user's diary */}
                    <Link href='/users/[userSlug]/diary' as={`/users/${userSlug}/diary`}>
                        <Box fontSize={(theme) => theme.typography.size.md} >Read my complete diary</Box>
                    </Link>
                </Box>

                <UserTimeline user={user} />

                <Box className="w-5 h-5 bg-primary-main rounded-full mx-auto mb-4"></Box>
                <Box className="w-10 h-10 bg-primary-main rounded-full mx-auto mb-4"></Box>
                <Box className="w-12 h-12 bg-primary-main rounded-full mx-auto mb-4"></Box>
                <Box className="w-full flex justify-center px-4 mb-4">
                    <Link href='/users/[userSlug]/diary' as={`/users/${userSlug}/diary`}>
                        <Button variant="contained" color="primary" size="large">
                            <Typography variant='h3' component={"p"} color="white" textTransform={"capitalize"} >📖 {t('read-my-diary')}</Typography>
                        </Button>
                    </Link>
                </Box>
            </Box>

            {/* TODO: Cambiare le immagini delle tre cards
            <Box id='cards-section' component='section'>
                <Box width='fit-content' m='auto' mb={4}>
                    <Typography variant="h2" fontWeight="bold" color='dark'>{t('about-me.more')}</Typography>
                </Box>
                <Container className={whiteBarClasses.customContainer}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Link href='/users/[userSlug]/diary' as={`/users/${userSlug}/diary`}>
                                <ImageCard image="/images/Rectangle-22952.png" title={t('cards.diary')} />
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Link href='/users/[userSlug]/diary/experiences' as={`/users/${userSlug}/diary/experiences`}>
                                <ImageCard image="/images/Rectangle-22953.png" title={t('cards.experiences')} />
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Link href='/users/[userSlug]/diary/projects' as={`/users/${userSlug}/diary/projects`}>
                                <ImageCard image="/images/Rectangle-22954.png" title={t('cards.projects')} />
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>*/}

            <Container className='px-12 lg:px-6 relative' sx={{ zIndex: 1 }}>
                <div style={{ overflow: "hidden" }}>
                    <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 1200 120"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ fill: colors.dark.main, width: '100%', height: 100, }}
                    >
                        <path
                            d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
                            opacity=".25"
                        />
                        <path
                            d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
                            opacity=".5"
                        />
                        <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
                    </svg>
                </div>
            </Container>

            {/* Contact Me Section */}
            <Box id='contact-section' component='section' className={userClasses.section} sx={{ backgroundImage: `linear-gradient(180deg, ${colors.white}, ${colors.background.main} 50%);` }}>
                <Container maxWidth="lg" className='px-12 lg:px-6 relative' sx={{ zIndex: 1 }}>
                    <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom color='dark'>
                        {t("contact-me.title")}
                    </Typography>
                    <Box component="form" role="form" onSubmit={handleSubmit((data) => handleContact(data))}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <Typography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.name")}
                                        </Typography>
                                    </Box>
                                    <TextField id='name' type="text" size="small" placeholder={t("contact-me.fields.name")} {...register("name", { required: t('contact-me.validations.name-required') })} error={errors.name && true} helperText={errors.name?.message} color='info' className='w-full' />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <Typography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.email")}
                                        </Typography>
                                    </Box>
                                    <TextField id='email' type="email" size="small" placeholder={t("contact-me.fields.email")} {...register("email", { required: t('contact-me.validations.email-required') })} error={errors.email && true} helperText={errors.email?.message} color='info' className='w-full' />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <Typography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.message")}
                                        </Typography>
                                    </Box>
                                    <SoftTextArea
                                        id='message'
                                        placeholder={t("contact-me.fields.message")}
                                        {...register("message", { required: t('contact-me.validations.message-required'), maxLength: { value: 500, message: t('contact-me.validations.message-length', { maxLength: '500' }) } })} error={errors.message && true} helpertext={errors.message?.message}
                                        minRows={3}
                                        maxLength={500}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mb={2}>
                            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                                {t("contact-me.submit")}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        const slugsResponse = await fetcher(UserService.getAllSlugsUrl());

        for (const locale of locales) {
            for (const slug of slugsResponse?.content) {
                paths.push(
                    {
                        params: {
                            userSlug: slug
                        },
                        locale
                    }
                );
            }
        }
    } catch (error) {
        console.debug("Error in user home getStaticPaths");
    }

    return {
        fallback: 'blocking',
        paths
    }
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    try {
        const locale = context.locale;

        const url = UserService.getBySlugUrl(context.params.userSlug, 'verbose');
        const userResponse = await fetcher(url);

        if (!userResponse?.content || User.isEmpty(userResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            messages: userResponse?.messages,
            fallback: {
                [url]: userResponse
            },
        }
    } catch (error) {
        props = {
            error: JSON.parse(JSON.stringify(error))
        }
    }

    return {
        props,
        revalidate
    }
}

/* 
If data changes really frequently, we can use getServerSideProps instead of getStaticProps and getStaticPaths.
This way, the page will be rendered on each request, so we can be sure that the data is always up to date.
export async function getServerSideProps(context) {
    const locale = context.locale;
    // const request = context.req;
    // const response = context.res;

    // Fetch translations for the specific user's locale
    const translations = await serverSideTranslations(locale, ['user-home', 'common']);

    return {
        props: {
            ...translations,
        },
    };
} */

export default UserHome;