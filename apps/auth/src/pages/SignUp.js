import Alert from '@mui/material/Alert';
import Switch from "@mui/material/Switch";
import curved9 from "@rob097/common-lib/assets/images/curved-images/curved-6.jpg";
import Box from '@mui/material/Box';
import SoftButton from "@rob097/common-lib/components/SoftButton";
import SoftInput from "@rob097/common-lib/components/SoftInput";
import SoftTypography from "@rob097/common-lib/components/SoftTypography";
import { useAuthStore } from "context/AuthStore";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import CoverLayout from "../components/CoverLayout";
// import { signUp } from "../utilities/AuthService";

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
            image={curved9}
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
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.firstName')}
                        </SoftTypography>
                    </Box>
                    <SoftInput id='firstName' type="text" placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.lastName')}
                        </SoftTypography>
                    </Box>
                    <SoftInput id='lastName' type="text" placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.email')}
                        </SoftTypography>
                    </Box>
                    <SoftInput id='email' type="email" placeholder="Email" {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.password')}
                        </SoftTypography>
                    </Box>
                    <SoftInput id='password' type={passwordShown ? "text" : "password"} placeholder="Password" {...register("password", { required: t('sign-up.validations.password-required') })} error={errors.password && true} helpertext={errors.password?.message} icon={{ component: (!passwordShown ? "visibility" : "visibility_off"), direction: "right", onClick: togglePasswordVisiblity }} />
                </Box>
                <Box mb={2}>
                    <Box mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            {t('sign-up.fields.matchingPassword')}
                        </SoftTypography>
                    </Box>
                    <SoftInput id='matchingPassword' type={passwordShown ? "text" : "password"} placeholder="Matching Password" {...register("matchingPassword", { required: t('sign-up.validations.matchingPassword-required'), validate: (val) => { if (watch('password') != val) { return t('sign-up.validations.matchingPassword-notMatch') } } })} error={errors.matchingPassword && true} helpertext={errors.matchingPassword?.message} />
                </Box>
                <Box display="flex" alignItems="center">
                    <Switch required {...register("terms", { required: true })} />
                    <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                    >
                        &nbsp;&nbsp;{t('sign-up.terms')}
                    </SoftTypography>
                </Box>
                <Box mt={4} mb={1}>
                    <SoftButton
                        type="submit"
                        variant="gradient"
                        color="info"
                        fullWidth
                        loading={isProcessing}
                        loadingPosition="start"
                        startIcon={<span />}
                    >
                        {t('sign-up.sign-up')}
                    </SoftButton>
                </Box>
                <Box mt={3} textAlign="center">
                    <SoftTypography variant="submit" color="text" fontWeight="regular">
                        {t('sign-up.have-account')}{" "}
                        <SoftTypography
                            component={Link}
                            to="../sign-in"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                        >
                            {t('sign-up.login')}
                        </SoftTypography>
                    </SoftTypography>
                </Box>
            </Box>
        </CoverLayout>
    );
}

export default SignUp;
