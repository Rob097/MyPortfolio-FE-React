import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "shared/stores/AuthStore";
import CoverLayout from "../components/CoverLayout";
import curved6 from "public/images/curved-6.jpg";
// import { signIn } from "../services/auth.service";

function SignUp() {
    const { t, i18n } = useTranslation("auth");
    const [store, dispatch] = useAuthStore();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    async function handleSignUp(data) {
        console.log(data);
        /*setIsProcessing(true);

        signUp(data).then(async response => {
          const bodyResponse = await response.json();
    
          const decodedToken = jwtDecode(bodyResponse.token);
          const user = new User(decodedToken);
    
          dispatch({
            type: "login",
            payload: {
              token: bodyResponse.token,
              user: user
            }
          });
    
          setIsProcessing(false);
    
          navigate('/welcome');
        }).catch(error => {
          setIsProcessing(false);
          setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : t('sign-up.generic-error'));
        }); */

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
                    <Box mb={1} ml={0.5}>
                        <Typography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.firstName')}
                        </Typography>
                    </Box>
                    <TextField id='firstName' type="text" placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <Typography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.lastName')}
                        </Typography>
                    </Box>
                    <TextField id='lastName' type="text" placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <Typography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.email')}
                        </Typography>
                    </Box>
                    <TextField id='email' type="email" placeholder="Email" {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <Typography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.password')}
                        </Typography>
                    </Box>
                    <TextField id='password' type={passwordShown ? "text" : "password"} placeholder="Password" {...register("password", { required: t('sign-up.validations.password-required') })} error={errors.password && true} helpertext={errors.password?.message} icon={{ component: (!passwordShown ? "visibility" : "visibility_off"), direction: "right", onClick: togglePasswordVisiblity }} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <Typography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.matchingPassword')}
                        </Typography>
                    </Box>
                    <TextField id='matchingPassword' type={passwordShown ? "text" : "password"} placeholder="Matching Password" {...register("matchingPassword", { required: t('sign-up.validations.matchingPassword-required'), validate: (val) => { if (watch('password') != val) { return t('sign-up.validations.matchingPassword-notMatch') } } })} error={errors.matchingPassword && true} helpertext={errors.matchingPassword?.message} />
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
                    <Button
                        type="submit"
                        variant="gradient"
                        color="info"
                        fullWidth
                        loading={isProcessing ? true : undefined}
                        startIcon={<span />}
                    >
                        {t('sign-up.sign-up')}
                    </Button>
                </Box>
                <Box mt={3} textAlign="center">
                    <Typography variant="submit" color="text" fontWeight="regular">
                        {t('sign-up.have-account')}{" "}
                        <Typography
                            component={Link}
                            to="../sign-in"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                        >
                            {t('sign-up.login')}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </CoverLayout>
    );
}

export default SignUp;
