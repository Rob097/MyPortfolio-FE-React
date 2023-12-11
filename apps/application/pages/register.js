import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
    const { t, i18n } = useTranslation();

    const paymentMethod = watch("payment", false);

    function handleRegister(data) {
        console.log(data);
        reset();
    }

    return (

        <Box component="section" className="flex flex-col justify-start items-center min-h-screen mb-20">
            <Box className="mt-20 space-y-4 mb-20 px-4">
                <Typography variant="h1" component="h1" color="primary" fontWeight="bold" className="text-center text-7xl">
                    Registration
                </Typography>
                <Typography variant="h2" component="p" color="black" fontWeight="bold" className="text-center text-5xl">
                    Tell us something about you
                </Typography>
            </Box>

            <Container maxWidth="2xl">
                <Box component="form" role="form" onSubmit={handleSubmit((data) => handleRegister(data))} className="w-full m-auto">
                    <Grid container rowSpacing={3} columnSpacing={10} >
                        <Grid item xs={12} md={6}>

                            {/* Add a select with the label "Your Plan" and the choices are "Basic", "Professional" and "Organization". Use register() to register the field. */}
                            <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-2">
                                Your Plan
                            </Typography>
                            <FormControl fullWidth>
                                {/* <InputLabel id="plan-label">Your Plan</InputLabel> */}
                                <Select
                                    // labelId="plan-label"
                                    id="plan"
                                    {...register("plan")}
                                    defaultValue="Professional"
                                // label="Your Plan"
                                >
                                    <MenuItem value="Basic">Basic</MenuItem>
                                    <MenuItem value="Professional">Professional</MenuItem>
                                    <MenuItem value="Organization">Organization</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={6} className="h-0 pb-0 !pt-0 m-0">
                            {/* Empty column */}
                        </Grid>

                        <Grid item xs={12} md={6}>

                            <Box className="mb-10">
                                <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-4">
                                    Mandatory Information
                                </Typography>

                                {/* Use flex boxes to create a first row with two equals columns with "First Name" and "Last Name" and a second row full width with "Email" */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="first-name"
                                            label="First Name"
                                            fullWidth
                                            {...register("firstName", { required: t('First Name is mandatory') })}
                                            error={errors.firstName && true}
                                            helperText={errors.firstName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="last-name"
                                            label="Last Name"
                                            fullWidth
                                            {...register("lastName", { required: t('Last Name is mandatory') })}
                                            error={errors.lastName && true}
                                            helperText={errors.lastName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            fullWidth
                                            {...register("email", { required: t('Email is mandatory') })}
                                            error={errors.email && true}
                                            helperText={errors.email?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box className="mb-10">
                                <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-4">
                                    Help us with some feedback
                                </Typography>

                                {/* Two rows: The first row has two equals columns: "What represents you the most?" with a select with four options "Sudent", "Professional", "Organization", "Other". The second column is a free text field "How did you found us?". The second row is a text area full width "What are you looking for in MyPortfolio?" */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="represents-label">What represents you the most?</InputLabel>
                                            <Select
                                                labelId="represents-label"
                                                id="represents"
                                                {...register("represents")}
                                                defaultValue="Student"
                                                label="What represents you the most?"
                                            >
                                                <MenuItem value="Student">Student</MenuItem>
                                                <MenuItem value="Professional">Professional</MenuItem>
                                                <MenuItem value="Organization">Organization</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="found-us"
                                            label="How did you found us?"
                                            fullWidth
                                            {...register("foundUs")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" color="black" className="text-sm mb-4">
                                            What are you looking for in MyPortfolio?
                                        </Typography>
                                        <SoftTextArea
                                            id="looking-for"
                                            label="What are you looking for in MyPortfolio?"
                                            placeholder="Write your expectations..."
                                            minRows={4}
                                            fullWidth
                                            {...register("lookingFor")}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6}>

                            <Box className="mb-10">
                                <Typography variant="h3" color="black" fontWeight="bold" className="text-lg mb-4">
                                    Payment Information
                                    {errors.payment && !paymentMethod && <FormHelperText error>{errors.payment.message}</FormHelperText>}
                                </Typography>

                                {/* If errors.payment, show the error message errors.payment.message */}

                                {/* Use flex boxes to create a first row with two equals columns with "First Name" and "Last Name" and a second row full width with "Email" */}
                                <Box className="flex flex-row justify-start items-center w-full space-x-14">
                                    <SquareButton
                                        {...register("payment", { required: t('Payment method is mandatory') })}
                                        image='/images/credit-card.svg'
                                        label='Credit Card'
                                        selected={paymentMethod === "creditCard"}
                                        onClick={() => setValue("payment", "creditCard")}
                                    />
                                    <SquareButton
                                        {...register("payment", { required: t('Payment method is mandatory') })}
                                        image='/images/paypal.svg'
                                        label='PayPal'
                                        selected={paymentMethod === "payPal"}
                                        onClick={() => setValue("payment", "payPal")}
                                    />
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>

                    <Box className="flex justify-center mt-10">
                        <Button variant="contained" color="primary" type="submit" size="large">
                            {t('Continue to the final step')}
                        </Button>
                    </Box>

                </Box>

            </Container>
        </Box>

    );
};

const SquareButton = (props) => {
    return (
        <Box
            {...props}
            className={"w-40 min-h-full h-36 flex flex-col justify-center items-center cursor-pointer rounded-md ease-in-out duration-300" + (props.selected ? " shadow-md border-primary-main border-2" : " border border-black hover:scale-105 hover:shadow-xl hover:border-primary-main hover:border-2")}
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