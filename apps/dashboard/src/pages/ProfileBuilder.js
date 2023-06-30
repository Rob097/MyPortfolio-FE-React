import Avatar from '@mui/material/Avatar';
import Grid from '@mui/system/Unstable_Grid';
import SoftBox from "common-lib/components/SoftBox";
import SoftInput from "common-lib/components/SoftInput";
import SoftTypography from "common-lib/components/SoftTypography";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Completed from '../components/Stepper/Completed';
import CustomStep from '../components/Stepper/CustomStep';
import CustomStepper from '../components/Stepper/CustomStepper';
import { useStepperStore } from '../components/Stepper/StepperContext';
import Steps from '../components/Stepper/Steps';

const ProfileBuilder = () => {
    const [store, dispatch] = useStepperStore();
    const { t, i18n } = useTranslation("dashboard");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const steps = [
        {
            title: 'About',
            isOptional: false
        },
        {
            title: 'Address',
            isOptional: false
        },
        {
            title: 'Third',
            isOptional: true
        }
    ];

    async function handleFirstSubmit(data) {
        console.log(data);

        dispatch({
            type: "next"
        });
    }

    const handleReset = () => {
        reset();
        dispatch({
            type: "reset"
        });
    };


    return (
        <CustomStepper steps={steps} title="Build Your Profile" subTitle="This information will let us know more about you.">

            <Steps steps={steps} />

            <CustomStep steps={steps} onSubmit={handleSubmit(handleFirstSubmit)} >

                {store.activeStep === steps.length && (
                    <Completed content="All steps completed - you're finished!" reset={{ label: 'Reset', action: handleReset }} />
                )}

                {store.activeStep === 0 && (

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
                                <SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                First Name
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput id='firstName' type="text" placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} />
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
                )}
                {store.activeStep === 1 && (

                    <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                            <SoftTypography variant="h5">Are you living in a nice area?</SoftTypography>
                            <SoftTypography variant="body">One thing I love about the later sunsets is the chance to go for a walk through the neighborhood woods before dinner</SoftTypography>
                        </SoftBox>

                        <SoftBox>
                            <Grid container width="100%" spacing={2}>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Nation
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='nation' type="text" placeholder={t('sign-up.fields.firstName')} {...register("nation", { required: t('sign-up.validations.nation-required') })} error={errors.nation && true} helpertext={errors.nation?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Nationality
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='nationality' type="text" placeholder="Nationality" /*placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} */ />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            City
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='city' type="text" placeholder="City" /*placeholder={t('sign-up.fields.firstName')} {...register("firstName", { required: t('sign-up.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} */ />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Province
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='province' type="text" placeholder="Province" /*placeholder={t('sign-up.fields.lastName')} {...register("lastName", { required: t('sign-up.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} */ />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Address
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='address' type="text" placeholder="Address"/* {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} */ />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            Cap
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='cap' type="text" placeholder="Cap"/* {...register("email", { required: t('sign-up.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} */ />
                                </Grid>
                            </Grid>

                        </SoftBox>

                    </SoftBox>
                )}
                {store.activeStep === 2 && (
                    <p key={"3"}>Terzo step</p>
                )}
            </CustomStep>
        </CustomStepper>
    );
}

export default ProfileBuilder;