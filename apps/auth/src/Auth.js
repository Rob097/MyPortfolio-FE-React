import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput
} from 'flowbite-react';
import { useForm } from 'react-hook-form';
import "./styles/index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Divider from "./components/Divider";

export default function Auth() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (

    <div className="px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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

      <Card className='w-full max-w-md mx-auto mt-8'>

        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit((data) => console.log(data))}>
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
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember">
              Remember me
            </Label>
          </div>
          <Button type="submit">
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
    </div>

  )
}
