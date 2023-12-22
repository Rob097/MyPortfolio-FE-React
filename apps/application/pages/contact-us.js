import Loading from "@/components/utils/loading/loading";
import UserService from '@/services/user.service';
import { Box, Button, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useState } from 'react';
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";
import { useForm } from 'react-hook-form';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const ACTION_NAME = "submit";
function ContactForm(props) {
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { promiseInProgress } = usePromiseTracker();
    const { executeGoogleReCaptcha } = useGoogleReCaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    const [contactRequestStatus, setContactRequestStatus] = useState(null);

    async function handleContact(data) {
        const token = await executeGoogleReCaptcha(ACTION_NAME);
        data.recaptchaToken = token;
        data.to = "myportfolio";
        data.language = i18n.language;

        trackPromise(
            UserService.sendEmail(data)
                .then(response => {
                    if (response?.status === 200) {
                        reset();
                        setContactRequestStatus({ status: "OK", message: t('contact-us.success') });
                    } else {
                        setContactRequestStatus({ status: "KO", message: t('contact-us.error') });
                    }
                })
                .catch(error => {
                    console.log(error)
                    setContactRequestStatus({ status: "KO", message: t('contact-us.error') });
                })
        );
    }

    return (
        <>

            <Head>
                <title>MyPortfolio | {t('contact-us.title')}</title>
                <meta name="description" content={t('contact-us.description')} />
                <meta name="keywords" content="MyPortfolio, contact, contact us, contact form" />
                <meta name="author" content="Roberto Dellantonio" />
                <meta name="robots" content="index, follow" />
                <meta name="Googlebot" content="index, follow" />
            </Head>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                        width: "90vw",
                        maxWidth: "1000px",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        padding: { xs: 2, sm: 8 },
                        marginBottom: { xs: 2, sm: 'auto' },
                        borderRadius: "8px",
                        zIndex: 1,
                    }}
                >
                    {promiseInProgress && <Loading adaptToComponent />}

                    <Typography variant="h1" sx={{ marginBottom: 8, textAlign: "center" }}>
                        {t('contact-us.title')}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }} gutterBottom color={contactRequestStatus?.status === 'OK' ? 'success.main' : contactRequestStatus?.status === 'KO' ? 'error.main' : 'dark'}>
                        {contactRequestStatus?.message}
                    </Typography>
                    <Box
                        component="form"
                        role="form"
                        onSubmit={handleSubmit((data) => handleContact(data))}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: 4,
                            }}
                        >
                            <Typography sx={{ marginBottom: 1 }}>{t('contact-us.name')}</Typography>
                            <TextField
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                name="name"
                                aria-label={t('contact-us.name')}
                                variant="outlined"
                                {...register("name", { required: t('contact-us.validations.name-required') })}
                                error={errors.name && true}
                                helperText={errors.name?.message}
                                color='info'
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: 4,
                            }}
                        >
                            <Typography sx={{ marginBottom: 1 }}>{t('contact-us.email')}</Typography>
                            <TextField
                                type="email"
                                id="email"
                                placeholder="john.doe@gmail.com"
                                name="email"
                                aria-label={t('contact-us.email')}
                                variant="outlined"
                                {...register("email", { required: t('contact-us.validations.email-required') })}
                                error={errors.email && true}
                                helperText={errors.email?.message}
                                color='info'
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: 4,
                            }}
                        >
                            <Typography sx={{ marginBottom: 1 }}>{t('contact-us.message')}</Typography>
                            <SoftTextArea
                                id='message'
                                placeholder="Write here your message"
                                {...register("message", { required: t('contact-us.validations.message-required') })} error={errors.message && true} helpertext={errors.message?.message}
                                aria-label={t('contact-us.message')}
                                minRows={4}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ margin: "auto" }}
                        >
                            {t('contact-us.send')}
                        </Button>
                        <br />
                        <Typography variant="caption">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export async function getStaticProps(context) {
    const { locale } = context
    const props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props
    }

}

export default ContactForm;