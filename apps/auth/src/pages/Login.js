import { useState } from "react";
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useAuthStore } from "context/AuthStore";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Alert
} from 'flowbite-react';
import jwtDecode from "jwt-decode";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Divider from "../components/Divider";
import { User } from "../models/user";
import "../styles/index.scss";
import { login } from '../utilities/AuthService';
import { useTranslation } from 'react-i18next';

const Login = () => {

  const { t, i18n } = useTranslation("auth");
  const [dispatch] = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  async function handleSignIn(data) {
    setIsProcessing(true);
    login(data).then(async response => {
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
      setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : "Errore nell'effettuare il login.");
    });
  }

  return (

    <div className='flex items-center justify-center sm:h-full h-fit w-full max-w-md mx-auto'>
      <div className="w-full px-4">
        <div>
          <h1>{t('login.welcome')}</h1>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p>
        </div>

        {
          errorMessage &&
          <Alert
            color="failure"
            icon={() => <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
            onDismiss={() => setErrorMessage(null)}
            rounded
            className="mt-4"
          >
            <span>
              <p className="ml-2">
                {errorMessage}
              </p>
            </span>
          </Alert>
        }

        <Card className='mt-8'>

          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit((data) => handleSignIn(data))}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Your email"
                />
              </div>
              <TextInput
                id="email"
                placeholder="name@flowbite.com"
                type="email"
                color={errors.email ? "failure" : ""}
                helperText={errors.email && errors.email.message}
                rightIcon={() => errors.email && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                {...register("email", { required: "Email is required." })}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password"
                type="password"
                color={errors.password ? "failure" : ""}
                helperText={errors.password && errors.password.message}
                rightIcon={() => errors.email && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                {...register("password", { required: "Password is required." })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="rememberMe" {...register("rememberMe")} />
              <Label htmlFor="rememberMe">
                Remember me
              </Label>
            </div>
            <Button type="submit" isProcessing={isProcessing}>
              Submit
            </Button>
          </form>

          <div className="mt-6">

            <Divider text="Or continue with" />

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button color="light" size="sm">
                <FontAwesomeIcon icon={faFacebook} size='xl' className='text-gray-500' />
              </Button>

              <Button color="light" size="sm">
                <FontAwesomeIcon icon={faTwitter} size='xl' className='text-gray-500' />
              </Button>

              <Button color="light" size="sm">
                <FontAwesomeIcon icon={faGithub} size='xl' className='text-gray-500' />
              </Button>
            </div>
          </div>
        </Card>
        <Link to="/">Go To HomePage</Link>
      </div>
    </div>
  )
}

export default Login;