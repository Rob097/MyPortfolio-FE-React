import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Switch from "@mui/material/Switch";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "shared/stores/AuthStore";
import CoverLayout from "../components/CoverLayout";
import { User } from "../models/user.model";
import { signIn } from "../services/auth.service";
import curved6 from "public/images/curved-6.jpg";

function SignIn() {
  const { t, i18n } = useTranslation("auth");
  const [store, dispatch] = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  async function handleSignIn(data) {
    setIsProcessing(true);

    /*     dispatch({
          type: "login",
          payload: {
            token: "",
            user: undefined
          }
        });
        navigate('/'); */

    signIn(data).then(async response => {
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

      navigate('/dashboard');
    }).catch(error => {
      setIsProcessing(false);
      setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : t('sign-in.generic-error'));
    });

  }

  return (
    <CoverLayout
      title={t('sign-in.welcome-back')}
      description={t('sign-in.instruction')}
      image={curved6}
    >

      {
        errorMessage &&
        <Box mb={2}>
          <Alert className="mt-4" severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
        </Box>
      }
      <Box component="form" role="form" onSubmit={handleSubmit((data) => handleSignIn(data))}>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="caption" fontWeight="bold">
              Email
            </Typography>
          </Box>
          <TextField id='email' type="email" placeholder="Email" {...register("email", { required: t('sign-in.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="caption" fontWeight="bold">
              Password
            </Typography>
          </Box>
          <TextField id='password' type="password" placeholder="Password" {...register("password", { required: t('sign-in.validations.password-required') })} error={errors.password && true} helpertext={errors.password?.message} />
        </Box>
        <Box display="flex" alignItems="center">
          <Switch {...register("rememberMe")} />
          <Typography
            variant="button"
            fontWeight="regular"
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;{t('sign-in.remember-me')}
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
            {t('sign-in.sign-in')}
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="submit" color="text" fontWeight="regular">
            {t('sign-in.no-account')}{" "}
            <Typography
              component={Link}
              to="../sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {t('sign-in.register')}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </CoverLayout>
  );
}

export default SignIn;
