import { useTranslation } from 'react-i18next';
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';
import SoftBox from "common-lib/components/SoftBox";
import SoftTypography from "common-lib/components/SoftTypography";
import Grid from '@mui/system/Unstable_Grid';
import Avatar from '@mui/material/Avatar';
import SoftInput from "common-lib/components/SoftInput";

const Home = () => {
    const { t, i18n } = useTranslation("dashboard");

    const secondStep = <p key={"2"}>Secondo step</p>;
    const thirdStep = <p key={"3"}>Terzo step</p>;

    return (

        <Grid container spacing={2} display="flex" width="100%" justifyContent="center">
            <Grid xs={12} lg={8}>
                <SoftBox p={2} mx={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    <SoftTypography variant="h3" fontWeight="bold">Build Your Profile</SoftTypography>
                    <SoftTypography variant="h5">This information will let us know more about you.</SoftTypography>
                    <HorizontalLinearStepper steps={[{ label: 'About', isOptional: false }, { label: 'Address', isOptional: false }, { label: 'Create an ad', isOptional: true }]}>
                        {[<FirstStepComponent key={"1"} />, <SecondStepComponent key={"1"} />, thirdStep]}
                    </HorizontalLinearStepper>
                </SoftBox>
            </Grid>
        </Grid>


        /*  <SoftBox p={2} mx={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
             <SoftTypography variant="h3">Build Your Profile</SoftTypography> <br/>
             <SoftTypography variant="h5">This information will let us know more about you.</SoftTypography>
             <HorizontalLinearStepper />
         </SoftBox> */
    );
}

export default Home;

const FirstStepComponent = () => {
    return (
        <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                <SoftTypography variant="h5">Let's start with the basic information</SoftTypography>
                <SoftTypography variant="body">Let us know your name and email address. Use an address you don't mind other users contacting you at</SoftTypography>
            </SoftBox>

            <Grid container width="100%">
                <Grid xs={12} sm={4} width="fit-content !important" mx="auto">
                    <Avatar sx={{ width: 110, height: 'auto' }} variant="rounded" src="https://demos.creative-tim.com/soft-ui-dashboard-pro-react/static/media/team-2.e725aef8c892cb21f262.jpg" />
                </Grid>
                <Grid xs={12} sm={8} pl={3}>
                    <SoftBox component="form" role="form">
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    First Name
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput id='firstName' type="text" placeholder="First Name" /*placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} */ />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Last Name
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput id='lastName' type="text" placeholder="Last Name" /*placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} */ />
                        </SoftBox>
                        <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                    Email
                                </SoftTypography>
                            </SoftBox>
                            <SoftInput id='email' type="email" placeholder="Email"/* {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} */ />
                        </SoftBox>
                    </SoftBox>
                </Grid>
            </Grid>

        </SoftBox>
    );
}

const SecondStepComponent = () => {
    return (
        <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                <SoftTypography variant="h5">Are you living in a nice area?</SoftTypography>
                <SoftTypography variant="body">One thing I love about the later sunsets is the chance to go for a walk through the neighborhood woods before dinner</SoftTypography>
            </SoftBox>

            <SoftBox component="form" role="form">
                <Grid container width="100%" spacing={2}>
                    <Grid sm={12} md={6} mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                First Name
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput id='firstName' type="text" placeholder="First Name" /*placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} */ />
                    </Grid>
                    <Grid sm={12} md={6} mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Last Name
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput id='lastName' type="text" placeholder="Last Name" /*placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} */ />
                    </Grid>
                    <Grid sm={12} md={6} mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Email
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput id='email' type="email" placeholder="Email"/* {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} */ />
                    </Grid>
                    <Grid sm={12} md={6} mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Email
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput id='email' type="email" placeholder="Email"/* {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} */ />
                    </Grid>
                </Grid>

            </SoftBox>

        </SoftBox>
    );
}