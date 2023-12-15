import MouseControlledButton from "@/components/buttons/MouseControlledButton";
import HeroSection from "@/components/sections/HeroSection";
import MainStorySection from '@/components/sections/MainStorySection';
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import UserTimeline from '@/components/timelines/userTimeline';
import Loading from "@/components/utils/loading/loading";
import ShowIf from '@/components/utils/showIf';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { User } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService, { useUser } from '@/services/user.service';
import tailwindConfig from '@/tailwind.config.js';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";
import { useForm } from 'react-hook-form';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import userClasses from './styles/shared.module.scss';
import Head from "next/head";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const ACTION_NAME = "submit";
const UserHome = () => {
    const router = useRouter();
    const { userSlug } = router.query;

    const { t, i18n } = useTranslation(['user-home', 'common']);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanXl = isGreaterThan('xl');
    const { promiseInProgress } = usePromiseTracker();
    const { executeGoogleReCaptcha } = useGoogleReCaptcha(SITE_KEY);

    const { user, isError } = useUser(userSlug, 'verbose');
    const [contactRequestStatus, setContactRequestStatus] = useState(null);

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    const mainStory = useMemo(() => {
        return user?.diaries?.flatMap(diary => diary?.stories)?.find(story => story?.id === user?.mainStoryId);
    }, [user]);

    const cvUrl = useMemo(() => {
        return user?.customizations?.CV?.[i18n.language] || user?.customizations?.CV?.en;
    }, [user, i18n.language]);

    async function handleContact(data) {
        const token = await executeGoogleReCaptcha(ACTION_NAME);
        data.recaptchaToken = token;
        data.userId = user?.id;
        data.language = i18n.language;

        trackPromise(
            UserService.sendEmail(data)
                .then(response => {
                    console.log(response)
                    if (response?.status === 200) {
                        reset();
                        setContactRequestStatus({ status: "OK", message: t('contact-me.success') });
                    } else {
                        setContactRequestStatus({ status: "KO", message: t('contact-me.error') });
                    }
                })
                .catch(error => {
                    console.log(error)
                    setContactRequestStatus({ status: "KO", message: t('contact-me.error') });
                })
        );
    }

    return (
        <>

            <Head>
                <title>{`MyPortfolio | ${user?.firstName} ${user?.lastName}`}</title>
                <meta name="description" content={user?.presentation} />
                <meta name="keywords" content={user?.skills?.map(skill => skill.skill.name).join(', ')} />
                <meta name="author" content={`${user?.firstName} ${user?.lastName}`} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            {/* <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}> */}
            <HeroSection img={{src: user?.customizations?.profileImage, alt: `${user?.firstName} ${user?.lastName}`}} buttons={[{ label: t('download-cv'), link: cvUrl, isDownload: true }, { label: t('contact-me.title'), link: '#contact-section' }]} customizations={user?.customizations}>
                <Typography variant="h3" color="primary" fontWeight="bold">{t("common:whoamI")}</Typography>
                <Typography className="text-6xl" variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: isGreaterThanXl ? '120%' : 'fit-content' }}>{user?.firstName} {user?.lastName}</Typography>
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
                <MainStorySection useContainer mainStory={mainStory} />
                {/* <PersonalCard image='https://mui.com/static/images/avatar/1.jpg' phone={user?.phone} email={user?.email} city={User.getUserAddress(user)} sectionToScrollTo='#contact-section' /> */}
            </Box>

            <Box id='user-timeline' component='section' className='flex flex-col justify-center mt-12 mb-10 xl:mt-0'>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column' }}>
                    {/* h3 */}
                    <Typography variant="h3" gutterBottom>
                        {t('quick-overview.title')}
                    </Typography>
                    {/* link to user's diary */}
                    <Link href='/users/[userSlug]/diary' as={`/users/${userSlug}/diary`}>
                        <Box fontSize={(theme) => theme.typography.size.md} >{t('read-my-complete-diary')}</Box>
                    </Link>
                </Box>

                <UserTimeline user={user} />

                <Box className="w-full flex justify-center px-4 mb-4 mt-32">
                    <MouseControlledButton href={`/users/${userSlug}/diary`} text={t('read-my-complete-diary')} icon={<AutoStoriesIcon className="sm:mr-2" fontSize="large" />} />
                </Box>
            </Box>

            {/* Contact Me Section */}
            <Box id='contact-section' component='section' className={userClasses.section} sx={{ backgroundImage: `linear-gradient(180deg, ${colors.white}, ${colors.background.main} 30%);` }}>
                <Container maxWidth="lg" className='px-12 lg:px-6 relative' sx={{ zIndex: 1 }}>
                    {promiseInProgress && <Loading adaptToComponent />}
                    <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom color='dark'>
                        {t("contact-me.title")}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }} gutterBottom color={contactRequestStatus?.status === 'OK' ? 'success.main' : contactRequestStatus?.status === 'KO' ? 'error.main' : 'dark'}>
                        {contactRequestStatus?.message}
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
                            <Typography variant="caption">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</Typography>
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