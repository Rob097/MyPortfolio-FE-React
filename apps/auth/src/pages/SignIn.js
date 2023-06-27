import Alert from '@mui/material/Alert';
import Switch from "@mui/material/Switch";
import curved9 from "common-lib/assets/images/curved-images/curved-6.jpg";
import SoftBox from "common-lib/components/SoftBox";
import SoftButton from "common-lib/components/SoftButton";
import SoftInput from "common-lib/components/SoftInput";
import SoftTypography from "common-lib/components/SoftTypography";
import { useAuthStore } from "context/AuthStore";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import CoverLayout from "../components/CoverLayout";

function SignIn() {
  const { t, i18n } = useTranslation("auth");
  const [store, dispatch] = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  async function handleSignIn(data) {
    // setIsProcessing(true);

    dispatch({
      type: "login",
      payload: {
        token: "",
        user: undefined
      }
    });
    navigate('/');

    /* signIn(data).then(async response => {
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
      setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : t('sign-in.generic-error'));
    }); */

  }

  return (
    <CoverLayout
      title={t('sign-in.welcome-back')}
      description={t('sign-in.instruction')}
      image={curved9}
    >

      {
        errorMessage &&
        <SoftBox mb={2}>
          <Alert className="mt-4" severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
        </SoftBox>
      }
      <SoftBox component="form" role="form" onSubmit={handleSubmit((data) => handleSignIn(data))}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput id='email' type="email" placeholder="Email" {...register("email", { required: t('sign-in.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput id='password' type="password" placeholder="Password" {...register("password", { required: t('sign-in.validations.password-required') })} error={errors.password && true} helpertext={errors.password?.message} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch {...register("rememberMe")} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;{t('sign-in.remember-me')}
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            type="submit"
            variant="gradient"
            color="info"
            fullWidth
            loading={isProcessing}
            loadingPosition="start"
            startIcon={<span />}
          >
            {t('sign-in.sign-in')}
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="submit" color="text" fontWeight="regular">
            {t('sign-in.no-account')}{" "}
            <SoftTypography
              component={Link}
              to="../sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              {t('sign-in.register')}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
