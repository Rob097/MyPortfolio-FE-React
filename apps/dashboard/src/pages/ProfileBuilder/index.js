import { Icon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/system/Unstable_Grid';
import SoftBox from "common-lib/components/SoftBox";
import SoftButton from 'common-lib/components/SoftButton';
import SoftInput from "common-lib/components/SoftInput";
import SoftTypography from "common-lib/components/SoftTypography";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import partyPopperImage from '../../../assets/images/party-popper.png';
import Completed from '../../components/Stepper/Completed';
import CustomStep from '../../components/Stepper/CustomStep';
import CustomStepper from '../../components/Stepper/CustomStepper';
import { useStepperStore } from '../../components/Stepper/StepperContext';
import Steps from '../../components/Stepper/Steps';
import { User } from '../../models/user';
import { UserService } from '../../services/UserService';
import styles from './ProfileBuilder.module.scss';

const ProfileBuilder = () => {
    const [store, dispatch] = useStepperStore();
    const { t, i18n } = useTranslation("dashboard");
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [type, setType] = useState();
    const [sex, setSex] = useState("M");

    const steps = [
        {
            title: t('profile-builder.first-step.name'),
            isOptional: false
        },
        {
            title: t('profile-builder.second-step.name'),
            isOptional: false
        },
        {
            title: t('profile-builder.third-step.name'),
            isOptional: true
        }
    ];

    useEffect(() => {
        if (store.activeStep === steps.length) {
            console.log("Final Submit");
            handleSubmit((data) => {
                const user = new User(data);
                UserService.update(user).then(async response => {
                    const bodyResponse = await response.json();
                    console.log(bodyResponse);
                });
            })();
        }
    }, [store.activeStep]);

    const handleNext = (data) => {
        dispatch({
            type: "next"
        });
    }

    const handleReset = () => {
        reset();
        setType(null);
        dispatch({
            type: "reset"
        });
    };

    const setTypeValue = (type) => {
        setType(type)
        setValue('type', type);
    }

    return (
        <CustomStepper steps={steps} title={t('profile-builder.title')} subTitle={t('profile-builder.subtitle')}>

            <Steps steps={steps} />

            <CustomStep steps={steps} onSubmit={handleSubmit(handleNext)}>

                {store.activeStep === steps.length && (
                    <Completed content={t('profile-builder.completed.title')} img={partyPopperImage} reset={{ label: t('profile-builder.completed.button'), action: handleReset }} />
                )}

                {store.activeStep === 0 && (

                    <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                            <SoftTypography variant="h5">{t('profile-builder.first-step.title')}</SoftTypography>
                            <SoftTypography variant="body">{t('profile-builder.first-step.subtitle')}</SoftTypography>
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
                                                {t('profile-builder.first-step.fields.firstName')}
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput id='firstName' type="text" placeholder={t('profile-builder.first-step.fields.firstName')} {...register("firstName", { required: t('profile-builder.first-step.validations.firstName-required') })} error={errors.firstName && true} helpertext={errors.firstName?.message} />
                                    </SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                {t('profile-builder.first-step.fields.lastName')}
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput id='lastName' type="text" placeholder={t('profile-builder.first-step.fields.lastName')} {...register("lastName", { required: t('profile-builder.first-step.validations.lastName-required') })} error={errors.lastName && true} helpertext={errors.lastName?.message} />
                                    </SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                {t('profile-builder.first-step.fields.sex.label')}
                                            </SoftTypography>
                                        </SoftBox>

                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth size="small" error={errors.sex}>
                                                <Select
                                                    id="sex"
                                                    value={sex}
                                                    {...register("sex", { required: t('profile-builder.first-step.validations.sex-required') })}
                                                    onChange={(event) => { setSex(event.target.value); }}
                                                >
                                                    <MenuItem value={"M"} className='mb-2'>{t('profile-builder.first-step.fields.sex.male')}</MenuItem>
                                                    <MenuItem value={"F"} className='mb-2'>{t('profile-builder.first-step.fields.sex.female')}</MenuItem>
                                                    <MenuItem value={"NB"} className='mb-2'>{t('profile-builder.first-step.fields.sex.non-binary')}</MenuItem>
                                                </Select>
                                                {errors.sex && <SoftBox mb={1} ml={0.5}>
                                                    <FormHelperText id={errors.sex?.message} style={{ marginLeft: '0' }} error={errors.sex && true}>{errors.sex?.message}</FormHelperText>
                                                </SoftBox>}
                                            </FormControl>
                                        </Box>
                                    </SoftBox>
                                    <SoftBox mb={2}>
                                        <SoftBox mb={1} ml={0.5}>
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                {t('profile-builder.first-step.fields.email')}
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput id='email' type="email" placeholder={t('profile-builder.first-step.fields.email')} {...register("email", { required: t('profile-builder.first-step.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
                                    </SoftBox>
                                </SoftBox>
                            </Grid>
                        </Grid>

                    </SoftBox>
                )}
                {store.activeStep === 1 && (

                    <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                            <SoftTypography variant="h5">{t('profile-builder.second-step.title')}</SoftTypography>
                            <SoftTypography variant="body">{t('profile-builder.second-step.subtitle')}</SoftTypography>
                        </SoftBox>

                        <SoftBox>
                            <Grid container width="100%" spacing={2}>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.nation')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='nation' type="text" placeholder={t('profile-builder.second-step.fields.nation')} {...register("nation", { required: t('profile-builder.second-step.validations.nation-required') })} error={errors.nation && true} helpertext={errors.nation?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.nationality')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='nationality' type="text" placeholder={t('profile-builder.second-step.fields.nationality')} {...register("nationality", { required: t('profile-builder.second-step.validations.nationality-required') })} error={errors.nationality && true} helpertext={errors.nationality?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.city')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='city' type="text" placeholder={t('profile-builder.second-step.fields.city')} {...register("city", { required: t('profile-builder.second-step.validations.city-required') })} error={errors.city && true} helpertext={errors.city?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.province')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='province' type="text" placeholder={t('profile-builder.second-step.fields.province')} {...register("province", { required: t('profile-builder.second-step.validations.province-required') })} error={errors.province && true} helpertext={errors.province?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.address')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='address' type="text" placeholder={t('profile-builder.second-step.fields.address')} {...register("address", { required: t('profile-builder.second-step.validations.address-required') })} error={errors.address && true} helpertext={errors.address?.message} />
                                </Grid>
                                <Grid sm={12} md={6} mb={2}>
                                    <SoftBox mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('profile-builder.second-step.fields.cap')}
                                        </SoftTypography>
                                    </SoftBox>
                                    <SoftInput id='cap' type="text" placeholder={t('profile-builder.second-step.fields.cap')} {...register("cap", { required: t('profile-builder.second-step.validations.cap-required') })} error={errors.cap && true} helpertext={errors.cap?.message} />
                                </Grid>
                            </Grid>

                        </SoftBox>

                    </SoftBox>
                )}
                {store.activeStep === 2 && (
                    <SoftBox mx="auto" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <SoftBox width="80%" sx={{ mb: "32px" }} textAlign="center">
                            <SoftTypography variant="h5">{t('profile-builder.third-step.title')}</SoftTypography>
                            <SoftTypography variant="body">{t('profile-builder.third-step.subtitle')}</SoftTypography>
                        </SoftBox>

                        <SoftBox>
                            <Grid container columnSpacing={6} className="m-auto md:w-full w-min">
                                <Grid sm={12} md={4} mb={2}>
                                    <SoftBox className="text-center w-fit">
                                        <SoftButton variant={type === "Code" ? "contained" : "outlined"} size="large" color="dark" className={styles.customButton} onClick={() => setTypeValue("Code")}><Icon>code</Icon></SoftButton>
                                        <SoftTypography variant="h6" color="dark" className="mt-2" fontWeight="bold">{t('profile-builder.third-step.types.code')}</SoftTypography>
                                    </SoftBox>
                                </Grid>
                                <Grid sm={12} md={4} mb={2}>
                                    <SoftBox className="text-center w-fit">
                                        <SoftButton variant={type === "Design" ? "contained" : "outlined"} size="large" color="dark" className={styles.customButton} onClick={() => setTypeValue("Design")}><Icon>design_services</Icon></SoftButton>
                                        <SoftTypography variant="h6" color="dark" className="mt-2" fontWeight="bold">{t('profile-builder.third-step.types.design')}</SoftTypography>
                                    </SoftBox>
                                </Grid>
                                <Grid sm={12} md={4} mb={2}>
                                    <SoftBox className="text-center w-fit">
                                        <SoftButton variant={type === "Other" ? "contained" : "outlined"} size="large" color="dark" className={styles.customButton} onClick={() => setTypeValue("Other")}><Icon>rocket_launch</Icon></SoftButton>
                                        <SoftTypography variant="h6" color="dark" className="mt-2" fontWeight="bold">{t('profile-builder.third-step.types.other')}</SoftTypography>
                                    </SoftBox>
                                </Grid>
                            </Grid>
                        </SoftBox>
                    </SoftBox>
                )}
            </CustomStep>
        </CustomStepper>
    );
}

export default ProfileBuilder;