import Loading from "@/components/utils/loading/loading";
import { BASE_URL } from "@/services/base.service";
import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter, usePromiseTracker } from 'react-promise-tracker';

const Register = () => {
    const router = useRouter();
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
    const { t } = useTranslation();
    const { promiseInProgress } = usePromiseTracker();

    const paymentPeriod = watch("period", false);
    const plan = watch("plan", false);

    useEffect(() => {
        setValue("plan", router.query.plan ? router.query.plan : "professional");
    }, [router.query.plan]);
    useEffect(() => {
        setValue("period", router.query.period ? router.query.period : "monthly");
    }, [router.query.period]);

    async function handleRegister(data) {
        console.log(data);

        try {
            manuallyIncrementPromiseCounter();
            const response = await fetch('https://api.ipify.org?format=json');
            const ipData = await response.json();

            const finalData = {
                ip: ipData.ip,
                registerForm: JSON.stringify(data)
            }

            const postResponse = await fetch(BASE_URL + '/core/feedback', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalData)
            });

            if (!postResponse.ok) {
                throw new Error(`HTTP error! status: ${postResponse.status}`);
            }

            // redirect to "/support" passing the finalData.registerForm as query "user"
            router.push({
                pathname: '/support',
                query: { user: finalData.registerForm }
            });

            reset();
        } catch (error) {
            console.log(error);
            manuallyDecrementPromiseCounter();
        }

    }

    return (

        <>

            <Head>
                <title>MyPortfolio | {t('registration.title')}</title>
                <meta name="description" content={t('registration.description')} />
                <meta name="keywords" content="MyPortfolio, register, registration, register form" />
                <meta name="author" content="Roberto Dellantonio" />
                <meta name="robots" content="index, follow" />
                <meta name="Googlebot" content="index, follow" />
            </Head>

            <Box component="section" className="flex flex-col justify-start items-center min-h-screen mb-20">

                {promiseInProgress && <Loading />}

                <Box className="mt-20 space-y-4 mb-20 px-4">
                    <Typography variant="h1" component="h1" color="primary" fontWeight="bold" className="text-center text-7xl">
                        {t('registration.title')}
                    </Typography>
                    <Typography variant="h2" component="p" color="black" fontWeight="bold" className="text-center text-5xl">
                        {t('registration.subtitle')}
                    </Typography>
                </Box>

                <Container maxWidth="2xl">
                    <Box component="form" role="form" onSubmit={handleSubmit((data) => handleRegister(data))} className="w-full m-auto">
                        <Grid container rowSpacing={3} columnSpacing={10} >

                            <Grid item xs={12} lg={6} className="!pt-12">

                                <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-2">
                                    {t('registration.plan.title')}
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="plan"
                                        {...register("plan", { required: t('registration.plan.validation.plan-required') })}
                                        value={plan}
                                        error={errors.plan && true}
                                    >
                                        <MenuItem value="basic">{t('registration.plan.basic')}</MenuItem>
                                        <MenuItem value="professional">{t('registration.plan.professional')}</MenuItem>
                                        <MenuItem value="organization">{t('registration.plan.organization')}</MenuItem>
                                    </Select>
                                    {errors.plan && <FormHelperText error>{errors.plan.message}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth className="pt-5">
                                    <Select
                                        id="period"
                                        {...register("period", { required: t('registration.plan.validation.period-required') })}
                                        value={paymentPeriod}
                                        error={errors.period && true}
                                    >
                                        <MenuItem value="monthly">{t('registration.plan.monthly')}</MenuItem>
                                        <MenuItem value="yearly">{t('registration.plan.yearly')}</MenuItem>
                                    </Select>
                                    {errors.period && <FormHelperText error>{errors.period.message}</FormHelperText>}
                                </FormControl>


                                <Box className="my-10">
                                    <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-4">
                                        {t('registration.mandatory-fields.title')}
                                    </Typography>

                                    {/* Use flex boxes to create a first row with two equals columns with "First Name" and "Last Name" and a second row full width with "Email" */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                id="first-name"
                                                label={t('registration.mandatory-fields.first-name')}
                                                fullWidth
                                                {...register("firstName", { required: t('registration.mandatory-fields.validations.first-name-required') })}
                                                error={errors.firstName && true}
                                                helperText={errors.firstName?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                id="last-name"
                                                label={t('registration.mandatory-fields.last-name')}
                                                fullWidth
                                                {...register("lastName", { required: t('registration.mandatory-fields.validations.last-name-required') })}
                                                error={errors.lastName && true}
                                                helperText={errors.lastName?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="email"
                                                label={t('registration.mandatory-fields.email')}
                                                fullWidth
                                                {...register("email", { required: t('registration.mandatory-fields.validations.email-required'), pattern: { value: /\S+@\S+\.\S+/, message: t('registration.mandatory-fields.validations.email-invalid') } })}
                                                error={errors.email && true}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className="mb-10">
                                    <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-4">
                                        {t('registration.feedback.title')}
                                    </Typography>

                                    {/* Two rows: The first row has two equals columns: "What represents you the most?" with a select with four options "Sudent", "Professional", "Organization", "Other". The second column is a free text field "How did you found us?". The second row is a text area full width "What are you looking for in MyPortfolio?" */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} lg={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="represents-label">{t('registration.feedback.represents.title')}</InputLabel>
                                                <Select
                                                    labelId="represents-label"
                                                    id="represents"
                                                    {...register("represents")}
                                                    defaultValue="Student"
                                                    label="What represents you the most?"
                                                >
                                                    <MenuItem value="Student">{t('registration.feedback.represents.student')}</MenuItem>
                                                    <MenuItem value="Professional">{t('registration.feedback.represents.professional')}</MenuItem>
                                                    <MenuItem value="Organization">{t('registration.feedback.represents.organization')}</MenuItem>
                                                    <MenuItem value="Other">{t('registration.feedback.represents.other')}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                id="found-us"
                                                label={t('registration.feedback.found-us')}
                                                fullWidth
                                                {...register("foundUs")}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="caption" color="black" className="text-sm mb-4">
                                                {t('registration.feedback.looking-for.title')}
                                            </Typography>
                                            <SoftTextArea
                                                id="looking-for"
                                                label={t('registration.feedback.looking-for.title')}
                                                placeholder={t('registration.feedback.looking-for.placeholder')}
                                                minRows={4}
                                                fullWidth
                                                {...register("lookingFor")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Grid>
                            <Grid item xs={12} lg={6} display={{ xs: 'none', lg: 'block' }}>

                                <Box className="mb-10">
                                    <Image
                                        id="registerImage"
                                        src={'/images/register-image.png'}
                                        layout="fill"
                                        alt="Register page image"
                                        className={`!relative`}
                                    />
                                </Box>

                            </Grid>
                        </Grid>

                        <Box className="flex justify-center mt-10">
                            <Button variant="contained" color="primary" type="submit" size="large">
                                {t('registration.submit')}
                            </Button>
                        </Box>

                    </Box>

                </Container>
            </Box>
        </>

    );
};

const SquareButton = (props) => {
    return (
        <Box
            {...props}
            className={"w-40 min-h-full h-36 flex flex-col justify-center items-center cursor-pointer rounded-lg ease-in-out duration-300" + (props.selected ? " shadow-lg border-primary-main border-2" : " border border-black hover:scale-105 hover:shadow-xl hover:border-primary-main hover:border-2")}
        >
            <img src={props.image} />
            <Typography variant="caption" color="black" className="text-sm mt-4">
                {props.label}
            </Typography>
        </Box>
    );
}

export default Register;

export async function getStaticProps(context) {
    const { locale } = context
    const props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props
    }

}