import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "shared/stores/AuthStore";
import CoverLayout from "@/layout/CoverLayout";
import curved6 from "public/images/curved-6.jpg";
import { signIn, signUp } from "../services/auth.service";
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from "../models/user.model";
import jwtDecode from "jwt-decode";

function SignUp() {
    const { t, i18n } = useTranslation("auth");
    const [store, dispatch] = useAuthStore();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [passwordShown, setPasswordShown] = useState(false);

    useEffect(() => {
        if(store?.user && store?.user?.customizations && store?.user?.customizations?.isSet !== true) {
          navigate('/auth/setup');
        } else if (store?.isLoggedIn && store?.user) {
          navigate('/dashboard');
        }
      }, [])

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    async function handleSignUp(data) {
        setIsProcessing(true);

        signUp(data).then(async response => {
            const bodyResponse = await response.json();
            if (!response.ok) {
                throw bodyResponse.messages;
            }

            const decodedToken = jwtDecode(bodyResponse.token);
            const user = new User(decodedToken);

            dispatch({
                type: "login",
                payload: {
                  token: bodyResponse.token,
                  user: user
                }
              });

            navigate('/auth/setup');

        }).catch(error => {
            if (error.length > 0) {
                setErrorMessage(error[0]?.text ?? t('sign-up.generic-error'));
            } else {
                setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : t('sign-up.generic-error'));
            }
        }).finally(() => setIsProcessing(false));

    }

    return (
        <CoverLayout
            title={t('sign-up.title')}
            description={t('sign-up.instruction')}
            image={curved6}
        >

            {
                errorMessage &&
                <Box mb={2}>
                    <Alert className="mt-4" severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
                </Box>
            }
            <Box component="form" role="form" onSubmit={handleSubmit(handleSignUp)}>
                <Box mb={2}>
                    <TextField id='firstName' type="text" label={t('sign-up.fields.firstName')} placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} className="w-full" />
                </Box>
                <Box mb={2}>
                    <TextField id='lastName' type="text" label={t('sign-up.fields.lastName')} placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} className="w-full" />
                </Box>
                <Box mb={2}>
                    <TextField id='email' type="email" label={t('sign-up.fields.email')} placeholder="Email" {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} className="w-full" />
                </Box>
                <Box mb={2}>
                    <TextField id='password' type={passwordShown ? "text" : "password"} label={t('sign-up.fields.password')} placeholder="Password" {...register("password", { required: t('sign-up.validations.password-required') })} error={errors.password && true} helpertext={errors.password?.message} icon={{ component: (!passwordShown ? "visibility" : "visibility_off"), direction: "right", onClick: togglePasswordVisiblity }} className="w-full" />
                </Box>
                <Box mb={2}>
                    <TextField id='matchingPassword' type={passwordShown ? "text" : "password"} label={t('sign-up.fields.matchingPassword')} placeholder="Matching Password" {...register("matchingPassword", { required: t('sign-up.validations.matchingPassword-required'), validate: (val) => { if (watch('password') != val) { return t('sign-up.validations.matchingPassword-notMatch') } } })} error={errors.matchingPassword && true} helpertext={errors.matchingPassword?.message} className="w-full" />
                </Box>
                <Box display="flex" alignItems="center">
                    <Switch required {...register("terms", { required: true })} />
                    <Typography
                        variant="button"
                        fontWeight="regular"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                    >
                        &nbsp;&nbsp;{t('sign-up.terms')}
                    </Typography>
                </Box>
                <Box mt={4} mb={1}>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        loading={isProcessing ? true : undefined}
                        startIcon={<span />}
                    >
                        {t('sign-up.sign-up')}
                    </LoadingButton>
                </Box>
                <Box mt={3} textAlign="center">
                    <Typography variant="submit" color="text" fontWeight="regular">
                        {t('sign-up.have-account')}{" "}
                        <Typography
                            component={Link}
                            to="../sign-in"
                            variant="button"
                            color="primary.main"
                            fontWeight="medium"
                        >
                            {t('sign-up.login')}
                        </Typography>
                    </Typography>
                    <img src={`${process.env.REACT_APP_AUTH_URL}/images/social-login.svg`} alt="Social login" className="w-full mt-4" style={{maxHeight: '6rem'}} />
                </Box>
            </Box>
        </CoverLayout>
    );
}

export default SignUp;
