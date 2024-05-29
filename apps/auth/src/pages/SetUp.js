import { setUpProfile } from '@/services/auth.service';
import { Alert, Box, Button, FormControl, FormHelperText, Grid, LinearProgress, MenuItem, Select, TextField, Typography } from "@mui/material";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Loading from "shared/components/Loading";
import TextArea from 'shared/components/TextArea';
import { useAuthStore } from "shared/stores/AuthStore";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SkillsSearchSelect from '../components/skills/SkillsSearchSelect';
import { User } from "../models/user.model";
import LanguageSelector from '../components/headerNavbar/languageSelector';

const SetUp = () => {
    const [store, dispatch] = useAuthStore();
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slickSlider, setSlickSlider] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // If not allowed, redirect to home
    useEffect(() => {
        if (!store.user) {
            navigate('/auth/sign-in', { replace: true });
        } else if (store.user?.customizations.isSet === true) {
            navigate('/dashboard/home', { replace: true });
        }
    }, []);

    const settings = useMemo(() => ({
        dots: false,
        arrows: false,
        infinite: false,
        swipe: false,
        autoplay: currentSlideIndex >= 2 ? false : true,
        autoplaySpeed: 1500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        adaptiveHeight: false,
        pauseOnHover: false,
        afterChange: (current) => { setCurrentSlideIndex(current) },
    }), [currentSlideIndex]);

    return (
        <>
            {
                errorMessage &&
                <Box mb={2}>
                    <Alert className="mt-2" severity="error" onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
                </Box>
            }
            <Box component="section" className="min-h-screen h-full flex flex-col">
                {/* Display an h1 at 25% of the height of the screen: */}
                <Box component="div" className="flex items-end justify-center" style={{ height: "25vh" }}>
                    <Typography variant="h1" component="h1" className="!text-6xl font-extrabold mb-4"><span className="text-primary-main">My</span><span className="text-dark">Portfolio</span></Typography>
                </Box>
                <Box component="div" className="relative h-full w-full slider-container" style={{ minHeight: "75vh" }}>

                    <Slider
                        {...settings}
                        ref={slider => setSlickSlider(slider)}
                    >
                        <div>
                            <FirstSlide firstName={store.user?.firstName} isActive={currentSlideIndex === 0} />
                        </div>
                        <div>
                            <SecondSlide isActive={currentSlideIndex === 1} />
                        </div>
                        <div>
                            <ProfileStepper isActive={currentSlideIndex === 2} slickSlider={slickSlider} setErrorMessage={setErrorMessage} setCurrentSlideIndex={setCurrentSlideIndex} setHasSubmitted={setHasSubmitted} />
                        </div>
                        <div>
                            <FourthSlide isActive={currentSlideIndex === 3} slickSlider={slickSlider} hasSubmitted={hasSubmitted} />
                        </div>
                    </Slider>

                    <Box className="fixed bottom-0 left-0 mb-4 ml-4">
                        <LanguageSelector />
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default SetUp;

const SimpleSlide = (props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (props.isActive) {
            const time = setTimeout(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
            }, 25);

            return () => {
                clearTimeout(time);
            };
        }
    }, [progress, props.isActive]);

    return (
        <Box component="div" className="w-full flex flex-col items-center justify-end" style={{ height: props.fullHeight ? "100%" : "25vh" }}>
            {props.showProgress && <LinearProgress className="w-full !h-0.5 container" variant="determinate" value={progress} />}
            <Typography variant="body1" component="div" className="text-2xl font-bold text-center">{props.children}</Typography>
        </Box>
    );
}

const FirstSlide = ({ isActive, firstName }) => {
    const { t, i18n } = useTranslation("auth");

    return (
        <SimpleSlide isActive={isActive}>
            {t('setup.first-slide', { name: firstName })}
        </SimpleSlide>
    );
}

const SecondSlide = ({ isActive }) => {
    const { t, i18n } = useTranslation("auth");

    return (
        <SimpleSlide isActive={isActive}>
            {t('setup.second-slide')}
        </SimpleSlide>
    );
}

const FourthSlide = ({ isActive, slickSlider, hasSubmitted }) => {
    const { t, i18n } = useTranslation("auth");
    const navigate = useNavigate();

    /* After 5 seconds redirect the user to the /dashboard/home */
    useEffect(() => {
        console.log('Fourth slide effect', isActive, hasSubmitted);
        if (isActive && hasSubmitted) {
            console.log('Redirecting to /dashboard/home');
            const time = setTimeout(() => {
                navigate('/dashboard/home');
            }, 5000);

            return () => {
                clearTimeout(time);
            };
        }
    }, [isActive, hasSubmitted]);

    return (
        <SimpleSlide isActive={isActive} fullHeight>
            <Box className="mt-20">
                {hasSubmitted && (
                    <>
                        <Typography variant='h3'>{t('setup.fourth-slide.title')}</Typography>
                        <Typography variant='body1'>{t('setup.fourth-slide.subtitle')}</Typography>
                        <img src={`${process.env.REACT_APP_AUTH_URL}/images/party-popper.png`} alt="party-popper" width={150} height={150} className='mx-auto mt-10' />
                    </>
                )}
                {!hasSubmitted && (
                    <>
                        <Typography variant='h3'>{t('setup.fourth-slide.error-title')}</Typography>
                        <Typography variant='body1'>{t('setup.fourth-slide.error-subtitle')}</Typography>
                        <Button variant="contained" color="primary" size="medium" onClick={() => slickSlider.slickPrev()}>{t('setup.stepper.back')}</Button>
                    </>
                )}
            </Box>
        </SimpleSlide>
    );
}

const ProfileStepper = ({ isActive, slickSlider, setErrorMessage, setCurrentSlideIndex, setHasSubmitted }) => {
    const { t, i18n } = useTranslation("auth");
    const steps = [t('setup.stepper.address.title'), t('setup.stepper.who.title'), t('setup.stepper.skills.title')];
    const [activeStep, setActiveStep] = useState(0);
    const [store, dispatch] = useAuthStore();
    const [info, setInfo] = useState({});
    const { promiseInProgress } = usePromiseTracker();

    const isStepOptional = (step) => {
        return false;
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function saveAddress(data) {
        setInfo(oldData => ({ ...oldData, ...data }));
        handleNext();
    }

    function savePersonalInfo(data) {
        setInfo(oldData => ({ ...oldData, ...data }));
        handleNext();
    }

    function saveSkills(data) {
        if (data.skills?.length > 3) {
            data.skills = data.skills.slice(0, 3);
        }
        setInfo(oldData => ({ ...oldData, ...data }));
    }

    useEffect(() => {
        if (activeStep === 2 && info?.skills) {

            info.skills = info.skills.map(skill => {
                return skill.id;
            });

            trackPromise(
                setUpProfile(info, store.user?.id, store.token)
                    .then(async response => {
                        const bodyResponse = await response.json();
                        if (!response.ok) {
                            throw bodyResponse.messages;
                        }

                        setHasSubmitted(true);
                        const newCustostomizations = bodyResponse.content.customizations;
                        const user = new User({ ...store.user, customizations: newCustostomizations });

                        dispatch({
                            type: 'replaceUser',
                            payload: { user: user }
                        });

                        setCurrentSlideIndex(3);
                        slickSlider.slickGoTo(3);
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.length > 0) {
                            setErrorMessage(error[0]?.text);
                        } else {
                            setErrorMessage(JSON.stringify(error) !== '{}' ? JSON.stringify(error) : t('sign-in.generic-error'));
                        }
                        throw error;
                    })
            );
        }
    }, [activeStep, info]);

    return (
        <Box component="div" className="w-full h-full mt-10" display={isActive ? "block" : "none"}>
            <Box className="md:container mx-2 md:mx-auto mb-10 mt-4">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {

                        };
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">{t('setup.stepper.optional')}</Typography>
                            );
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </Box>

            <Box className="md:container h-full mx-2 md:mx-auto my-4 flex flex-col justify-center items-center text-center">
                {activeStep === 0 && (
                    <AddressForm
                        handleSubmitAddress={saveAddress}
                        info={info}
                    />
                )}

                {activeStep === 1 && (
                    <PersonalInfoForm
                        handleSubmitPersonalInfo={savePersonalInfo}
                        handleBack={handleBack}
                        info={info}
                    />
                )}

                {activeStep === 2 && (
                    <SkillsForm
                        handleSubmitSkills={saveSkills}
                        handleBack={handleBack}
                        info={info}
                    />
                )}
            </Box>

            {promiseInProgress && <Loading adaptToComponent />}
        </Box>
    );
};

const AddressForm = ({ handleSubmitAddress, info }) => {
    const { t } = useTranslation("auth");
    const { register, handleSubmit, formState: { errors }, reset, setValue, getFieldState } = useForm();

    useEffect(() => {
        for (const key in info) {
            if (getFieldState(key)) {
                setValue(key, info[key]);
            }
        }
    }, [info]);

    return (
        <Box
            component="form"
            role="form"
            onSubmit={handleSubmit((data) => handleSubmitAddress(data))}
        >
            <Box className="my-10">
                <Typography variant="h3" className="text-4xl font-extrabold">{t('setup.stepper.address.subtitle')}</Typography>
            </Box>

            <Box component="div" className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">

                <TextField
                    type="text"
                    id="nation"
                    placeholder={t('setup.stepper.address.fields.nation.placeholder')}
                    name="nation"
                    label={t('setup.stepper.address.fields.nation.label')}
                    aria-label={t('setup.stepper.address.fields.nation.label')}
                    variant="outlined"
                    {...register("nation", { required: t('setup.stepper.address.fields.nation.required') })}
                    error={errors.nation && true}
                    helperText={errors.nation?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="region"
                    placeholder={t('setup.stepper.address.fields.region.placeholder')}
                    name="region"
                    label={t('setup.stepper.address.fields.region.label')}
                    aria-label={t('setup.stepper.address.fields.region.label')}
                    variant="outlined"
                    {...register("region", { required: t('setup.stepper.address.fields.region.required') })}
                    error={errors.region && true}
                    helperText={errors.region?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="city"
                    placeholder={t('setup.stepper.address.fields.city.placeholder')}
                    name="city"
                    label={t('setup.stepper.address.fields.city.label')}
                    aria-label={t('setup.stepper.address.fields.city.label')}
                    variant="outlined"
                    {...register("city", { required: t('setup.stepper.address.fields.city.required') })}
                    error={errors.city && true}
                    helperText={errors.city?.message}
                    color='primary'
                    size="small"
                />

            </Box>
            <Box component="div" className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">

                <TextField
                    type="text"
                    id="cap"
                    placeholder={t('setup.stepper.address.fields.cap.placeholder')}
                    name="cap"
                    label={t('setup.stepper.address.fields.cap.label')}
                    aria-label={t('setup.stepper.address.fields.cap.label')}
                    variant="outlined"
                    {...register("cap", { required: t('setup.stepper.address.fields.cap.required') })}
                    error={errors.cap && true}
                    helperText={errors.cap?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="address"
                    placeholder={t('setup.stepper.address.fields.address.placeholder')}
                    name="address"
                    label={t('setup.stepper.address.fields.address.label')}
                    aria-label={t('setup.stepper.address.fields.address.label')}
                    variant="outlined"
                    {...register("address", { required: t('setup.stepper.address.fields.address.required') })}
                    error={errors.address && true}
                    helperText={errors.address?.message}
                    color='primary'
                    size="small"
                />
            </Box>

            <Box component="div" className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary" size="medium">{t('setup.stepper.next')}</Button>
            </Box>
        </Box>
    );
}

const PersonalInfoForm = ({ handleSubmitPersonalInfo, handleBack, info }) => {
    const { t } = useTranslation("auth");
    const { register, handleSubmit, formState: { errors }, reset, watch, getValues, setValue, getFieldState } = useForm();
    const type = watch('type', 'default');

    useEffect(() => {
        for (const key in info) {
            if (getFieldState(key)) {
                setValue(key, info[key]);
            }
        }
    }, [info]);

    return (
        <Box
            component="form"
            role="form"
            onSubmit={handleSubmit((data) => handleSubmitPersonalInfo(data))}
            sx={{ minWidth: '60%' }}
        >

            <Box className="my-10">
                <Typography variant="h3" className="text-4xl font-extrabold">{t('setup.stepper.who.title')}</Typography>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box component="div" className="flex flex-col gap-4">
                            <FormControl fullWidth>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type"
                                    {...register("type", { required: true, validate: value => value !== 'default' })}
                                    error={errors.type && true}
                                    color='primary'
                                    size="small"
                                    value={type}
                                    defaultValue={"default"}
                                    className="text-left"
                                >
                                    <MenuItem value="default" disabled>
                                        <em>{t('setup.stepper.who.fields.type.placeholder')}</em>
                                    </MenuItem>
                                    <MenuItem value="student">{t('setup.stepper.who.fields.type.options.student')}</MenuItem>
                                    <MenuItem value="professional">{t('setup.stepper.who.fields.type.options.professional')}</MenuItem>
                                    <MenuItem value="organization">{t('setup.stepper.who.fields.type.options.organization')}</MenuItem>
                                </Select>
                                {errors.type && <FormHelperText error>{t('setup.stepper.who.fields.type.required')}</FormHelperText>}
                            </FormControl>

                            <TextField
                                type="text"
                                id="role"
                                placeholder={t('setup.stepper.who.fields.role.placeholder')}
                                name="role"
                                variant="outlined"
                                {...register("role", { required: t('setup.stepper.who.fields.role.required') })}
                                error={errors.role && true}
                                helperText={errors.role?.message}
                                color='primary'
                                size="small"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextArea
                            id="bio"
                            placeholder={t('setup.stepper.who.fields.bio.placeholder')}
                            name="bio"
                            aria-label={t('setup.stepper.who.fields.bio.label')}
                            minRows={5}
                            maxRows={10}
                            style={{ width: '100%' }}
                            {...register("bio", { required: t('setup.stepper.who.fields.bio.required') })}
                            error={errors.bio && true}
                            helpertext={errors.bio?.message}
                            maxLength={150}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box component="div" className="flex justify-between mt-4">
                <Button type="button" variant="contained" color="primary" size="medium" onClick={handleBack}>{t('setup.stepper.back')}</Button>
                <Button type="submit" variant="contained" color="primary" size="medium">{t('setup.stepper.next')}</Button>
            </Box>
        </Box>
    );
}

const SkillsForm = ({ handleSubmitSkills, handleBack, info }) => {
    const { t } = useTranslation("auth");
    const skillsForm = useForm(); //{ register, handleSubmit, formState: { errors }, watch, getValues, setValue, getFieldState }

    /* Form with a chip input where a user can write in three different skills */
    return (
        <Box
            component="form"
            role="form"
            onSubmit={skillsForm.handleSubmit((data) => handleSubmitSkills(data))}
        >
            <Box className="my-10">
                <Typography variant="h3" className="text-4xl font-extrabold">{t('setup.stepper.skills.subtitle-1')}</Typography>
                <Typography variant="body1" className="text-lg font-bold">{t('setup.stepper.skills.subtitle-2')}</Typography>
                <Typography variant="body2">{t('setup.stepper.skills.subtitle-3')}</Typography>
            </Box>

            <Box component="div" className="flex flex-col" style={{ maxWidth: '40rem' }}>
                <SkillsSearchSelect myForm={skillsForm} numberOfMain={3} />
                {/* <NewSkill afterCreationAction={addNewSkill} /> */}
            </Box>

            <Box component="div" className="flex justify-between mt-4">
                <Button type="button" variant="contained" color="primary" size="medium" onClick={handleBack}>{t('setup.stepper.back')}</Button>
                <Button type="submit" variant="contained" color="primary" size="medium">{t('setup.stepper.finish')}</Button>
            </Box>
        </Box>
    );
}