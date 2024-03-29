import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Chip, FormControl, FormHelperText, Grid, LinearProgress, MenuItem, Select, TextField, Typography } from "@mui/material";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import TextArea from 'shared/components/TextArea';
import { useAuthStore } from "shared/stores/AuthStore";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ProfileSetUp = () => {
    const [store, dispatch] = useAuthStore();
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slickSlider, setSlickSlider] = useState(null);

    // If not allowed, redirect to home
    useEffect(() => {
        if (!store.user || !store.user.customizations || JSON.parse(store.user.customizations).isSet === true) {
            navigate('/dashboard/home', { replace: true });
        }
    }, []);

    const settings = useMemo(() => ({
        dots: false,
        arrows: false,
        infinite: false,
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
        <Box component="section" className="min-h-screen h-full flex flex-col">
            {/* Display an h1 at 25% of the height of the screen: */}
            <Box component="div" className="flex items-end justify-center" style={{ height: "25vh" }}>
                <Typography variant="h1" component="h1" className="!text-6xl font-extrabold mb-4"><span className="text-primary-main">My</span><span className="text-dark">Portfolio</span></Typography>
            </Box>
            <Box component="div" className="h-full w-full slider-container" style={{ minHeight: "75vh" }}>

                <Slider
                    {...settings}
                    ref={slider => setSlickSlider(slider)}
                >
                    <div>
                        <FirstSlide firstName={store.user.firstName} isActive={currentSlideIndex === 0} />
                    </div>
                    <div>
                        <SecondSlide isActive={currentSlideIndex === 1} />
                    </div>
                    <div>
                        <ProfileStepper isActive={currentSlideIndex === 2} slickSlider={slickSlider} />
                    </div>
                    <div>
                        <FourthSlide isActive={currentSlideIndex === 3} />
                    </div>
                </Slider>

            </Box>
        </Box>
    );
};

export default ProfileSetUp;

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
    return (
        <SimpleSlide isActive={isActive}>
            Welcome, {firstName}
        </SimpleSlide>
    );
}

const SecondSlide = ({ isActive }) => {
    return (
        <SimpleSlide isActive={isActive}>
            Let's set up your profile.
        </SimpleSlide>
    );
}

const FourthSlide = ({ isActive }) => {
    const navigate = useNavigate();

    /* After 5 seconds redirect the user to the /dashboard/home */
    useEffect(() => {
        if (isActive) {
            const time = setTimeout(() => {
                navigate('/dashboard/home');
            }, 5000);

            return () => {
                clearTimeout(time);
            };
        }
    }, [isActive]);

    return (
        <SimpleSlide isActive={isActive} fullHeight>
            <Box className="mt-20">
                <Typography variant='h3'>You're all set!</Typography>
                <Typography variant='body1'>Redirecting you to your dashboard...</Typography>
                <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/party-popper.png`} alt="party-popper" width={150} height={150} className='mx-auto mt-10' />
            </Box>
        </SimpleSlide>
    );
}

const ProfileStepper = ({ isActive, slickSlider }) => {
    const steps = ['Address', 'Who are you?', 'Your Skills'];
    const { t, i18n } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [store, dispatch] = useAuthStore();
    const [info, setInfo] = useState({});

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
        console.log(data);
        if (data.skill?.length > 3) {
            data.skill = data.skill.slice(0, 3);
        }

        setInfo(oldData => ({ ...oldData, ...data }));
    }

    useEffect(() => {
        if (activeStep === 2 && info?.skill) {
            const customizations = JSON.parse(store.user.customizations);
            customizations.isSet = true;
            customizations.profile = info;
            console.log(customizations);
            // dispatch({ type: 'SET_CUSTOMIZATIONS', payload: customizations });
            // navigate('/dashboard/home');
            slickSlider.slickGoTo(3);
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
                                <Typography variant="caption">Optional</Typography>
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
        </Box>
    );
};

const AddressForm = ({ handleSubmitAddress, info }) => {
    const { t } = useTranslation();
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
                <Typography variant="h3" className="text-4xl font-extrabold">Where do you live?</Typography>
            </Box>

            <Box component="div" className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">

                <TextField
                    type="text"
                    id="nation"
                    placeholder="Italy"
                    name="nation"
                    label={t('Nation')}
                    aria-label={t('Nation')}
                    variant="outlined"
                    {...register("nation", { required: t('profile.set-up.validations.nation-required') })}
                    error={errors.nation && true}
                    helperText={errors.nation?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="region"
                    placeholder="Trento"
                    name="region"
                    label={t('Region')}
                    aria-label={t('Region')}
                    variant="outlined"
                    {...register("region", { required: t('profile.set-up.validations.region-required') })}
                    error={errors.region && true}
                    helperText={errors.region?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="city"
                    placeholder="Predazzo"
                    name="city"
                    label={t('City')}
                    aria-label={t('City')}
                    variant="outlined"
                    {...register("city", { required: t('profile.set-up.validations.city-required') })}
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
                    placeholder="38037"
                    name="cap"
                    label={t('CAP')}
                    aria-label={t('cap')}
                    variant="outlined"
                    {...register("cap", { required: t('profile.set-up.validations.cap-required') })}
                    error={errors.cap && true}
                    helperText={errors.cap?.message}
                    color='primary'
                    size="small"
                />

                <TextField
                    type="text"
                    id="address"
                    placeholder="Via Garibaldi 74"
                    name="address"
                    label={t('Address')}
                    aria-label={t('address')}
                    variant="outlined"
                    {...register("address", { required: t('profile.set-up.validations.address-required') })}
                    error={errors.address && true}
                    helperText={errors.address?.message}
                    color='primary'
                    size="small"
                />
            </Box>

            <Box component="div" className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary" size="medium">Next</Button>
            </Box>
        </Box>
    );
}

const PersonalInfoForm = ({ handleSubmitPersonalInfo, handleBack, info }) => {
    const { t } = useTranslation();
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
                <Typography variant="h3" className="text-4xl font-extrabold">Who are you?</Typography>
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
                                        <em>Student / Professional / Organizzation</em>
                                    </MenuItem>
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="professional">Professional</MenuItem>
                                    <MenuItem value="organization">Organization</MenuItem>
                                </Select>
                                {errors.type && <FormHelperText error>{t('profile.set-up.validations.type-required')}</FormHelperText>}
                            </FormControl>

                            <TextField
                                type="text"
                                id="role"
                                placeholder="Your School / Profession / Role"
                                name="role"
                                variant="outlined"
                                {...register("role", { required: t('profile.set-up.validations.role-required') })}
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
                            placeholder="Write something about you..."
                            name="bio"
                            aria-label={t('Bio')}
                            minRows={5}
                            maxRows={10}
                            style={{ width: '100%' }}
                            {...register("bio", { required: t('profile.set-up.validations.bio-required') })}
                            error={errors.bio && true}
                            helpertext={errors.bio?.message}
                            maxLength={150}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box component="div" className="flex justify-between mt-4">
                <Button type="button" variant="contained" color="primary" size="medium" onClick={handleBack}>Back</Button>
                <Button type="submit" variant="contained" color="primary" size="medium">Next</Button>
            </Box>
        </Box>
    );
}

const SkillsForm = ({ handleSubmitSkills, handleBack, info }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, watch, getValues, setValue, getFieldState } = useForm();
    const skill = watch('skill', []);

    useEffect(() => {
        for (const key in info) {
            if (getFieldState(key)) {
                setValue(key, info[key]);
            }
        }
    }, [info]);

    const handleDeleteSkill = (e, skill) => {
        e.preventDefault();
        const values = getValues('skill');
        const newValues = values.filter(value => value !== skill);
        setValue('skill', newValues);
    }

    /* Form with a chip input where a user can write in three different skills */
    return (
        <Box
            component="form"
            role="form"
            onSubmit={handleSubmit((data) => handleSubmitSkills(data))}
        >
            <Box className="my-10">
                <Typography variant="h3" className="text-4xl font-extrabold">Choose 3 skills that most represents you</Typography>
                <Typography variant="body1" className="text-lg font-bold">You will be able to add more later on</Typography>
            </Box>

            <Box component="div" className="flex flex-col" style={{ maxWidth: '40rem' }}>
                <FormControl fullWidth>
                    <Select
                        labelId="skill-label"
                        id="skill"
                        name="skill"
                        {...register("skill", { required: t('profile.set-up.validations.skill-required'), validate: value => value.length === 3 })}
                        error={errors.skill && true}
                        color='primary'
                        size="small"
                        multiple
                        value={skill ? skill : []}
                        className="text-left"
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip
                                        key={value}
                                        id={value}
                                        label={value}
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                        onMouseDown={(event) => event.stopPropagation()}
                                        onDelete={(e) => handleDeleteSkill(e, value)}
                                    />
                                ))}
                            </Box>
                        )}
                    >
                        {['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Firebase', 'Python', 'Django', 'Flask', 'FastAPI', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 'TailwindCSS', 'Bootstrap', 'Material-UI', 'Chakra-UI', 'Styled-Components', 'Jest', 'Mocha', 'Chai', 'Cypress', 'React Testing Library', 'Jasmine', 'Karma', 'Puppeteer', 'Playwright', 'Selenium', 'WebdriverIO', 'Cucumber', 'JBehave', 'Gherkin', 'Appium', 'Detox', 'XCTest', 'Espresso', 'Robotium', 'Calabash', 'Selendroid', 'MonkeyTalk', 'KIF', 'Frank', 'EarlGrey', 'UIAutomator', 'XCUITest'].map((name) => (
                            <MenuItem key={name} value={name} disabled={skill?.length >= 3 && !skill?.includes(name)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.skill && <FormHelperText error>{t('profile.set-up.validations.skill-required')}</FormHelperText>}
                </FormControl>
            </Box>

            <Box component="div" className="flex justify-between mt-4">
                <Button type="button" variant="contained" color="primary" size="medium" onClick={handleBack}>Back</Button>
                <Button type="submit" variant="contained" color="primary" size="medium">Finish</Button>
            </Box>
        </Box>
    );
}