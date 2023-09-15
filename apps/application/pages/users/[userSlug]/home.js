import ImageCard from '@/components/cards/imageCard/ImageCard';
import PersonalCard from '@/components/cards/personalCard';
import HeroSection from "@/components/sections/HeroSection";
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import Loading from '@/components/utils/loading/loading';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { User } from '@/models/user.model';
import UserService, { useUser } from '@/services/user.service';
import tailwindConfig from '@/tailwind.config.js';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import userClasses from './styles/shared.module.scss';

const UserHome = () => {
    const router = useRouter();
    const { userSlug } = router.query;

    const { t } = useTranslation(['user-home', 'common']);
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanXl = isGreaterThan('xl'); const isGreaterThanLg = isGreaterThan('lg'); const isSmallerThanLg = isSmallerThan('lg');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, isLoading, isError, isValidating } = useUser(userSlug, 'verbose');

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    async function handleContact(data) {
        console.log(data);
    }

    return (
        <>

            <ShowIf condition={isLoading || isValidating}>
                <Loading />
            </ShowIf>
            <ShowIf condition={!isLoading && !isValidating && isError === undefined && !user?.isEmpty()}>

                {/* <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}> */}
                <HeroSection img="/images/SamplePhoto_12.jpg" buttons={[{ label: t('download-cv') }, { label: t('contact-me.title'), link: '#contact-section' }]}>
                    <Typography variant="h3" color="primary" fontWeight="bold">{t("common:whoamI")}</Typography>
                    <Typography variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: isGreaterThanXl ? '120%' : 'fit-content' }}>{user?.firstName} {user?.lastName}</Typography>
                    <Typography variant="h5" color="dark" fontWeight="bold" gutterBottom>{user?.title}</Typography>
                    <Typography variant="subtitle1" color="text" gutterBottom>{user?.description}</Typography>
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

                <Box id='main-story-section' component='section' className='mt-12 xl:mt-0'>
                    <Box className='absolute w-full h-96'>
                        <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl bg-dark-main' style={{ opacity: 0.9 }} ></div>
                    </Box>
                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <PersonalCard image='https://mui.com/static/images/avatar/1.jpg' phone={user?.phone} email={user?.email} city={User.getUserAddress(user)} sectionToScrollTo='#contact-section' />

                        <Grid container >
                            <Grid item xs={12} height='25em' marginBottom={2} className='flex justify-center items-center'>
                                <Box className='flex justify-center h-fit items-end'>
                                    <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8 mx-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                        <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                        <Typography variant="h5" fontWeight="bold" color="primary">{t('about-me.title')}</Typography>
                                        <div className={userClasses.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
                                            <Typography variant="body2" className='leading-7'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                            </Typography>
                                        </div>
                                        <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* TODO: Cambiare le immagini delle tre cards */}
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
                </Box>

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
            </ShowIf>
        </>
    );
}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        const slugsResponse = await UserService.getAllSlugs();
        const slugs = (await slugsResponse.json()).content;

        for (const locale of locales) {
            for (const slug of slugs) {
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
    const locale = context.locale;

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale))
        },
        revalidate: 1800 // Revalidate at most every 30 minutes
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


