import CustomFileInput from '@/components/CustomFileInput';
import ExpandableSection from '@/components/ExpandableSection';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { UserService } from "@/services/user.service";
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import { useEffect, useMemo, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { MAX_FILE_SIZE } from "shared/utilities/constants";

const ONE_MB = 1024 * 1024;
const UserProfile = () => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const myForm = useForm(); //{ register, handleSubmit, setValue, getValues, watch, formState: { errors }, reset }

    function handleSubmit(data) {
        // when updating the user's profile, don't change the customizations CV and ProfileImage which are handled separately
        data.customizations.CV = store.user.customizations?.CV;
        data.customizations.profileImage = store.user.customizations?.profileImage;

        // If all the fields are the same, don't update the user's profile
        const dataToCheck = {};
        Object.keys(data).forEach(key => {
            dataToCheck[key] = store.user[key];
        });
        if (JSON.stringify(dataToCheck) === JSON.stringify(data)) {
            displayMessages([{ text: t('user-profile.no-changes-to-save'), level: 'info' }]);
            return;
        }



        // Update the user's profile
        trackPromise(
            UserService.updateSomeData(store.user, data)
                .then((response) => {
                    console.log(response);
                    UserService.invalidateCurrentUser();
                })
                .catch((error) => {
                    console.log(error);
                })
        );

    }

    return (
        <>
            <h1>{t('user-profile.title')}</h1>
            <Box component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate sx={{ mt: 1 }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {t('labels.save')}
                </Button>
                <GeneralInformation myForm={myForm} />
                <About myForm={myForm} />
                <Skills myForm={myForm} />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {t('labels.save')}
                </Button>
            </Box>
        </>
    )
}

export default UserProfile;

const GeneralInformation = ({ myForm }) => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const [completeAt, setCompleteAt] = useState(0);
    const avatar = myForm.watch('customizations.profileImage');

    useEffect(() => {
        if (store.user) {
            myForm.setValue('customizations.profileImage', (store.user.customizations?.profileImage ?? ''));
            myForm.setValue('firstName', store.user.firstName);
            myForm.setValue('lastName', store.user.lastName);
            myForm.setValue('email', store.user.email);
            myForm.setValue('profession', store.user.profession);
            myForm.setValue('slug', store.user.slug);
            myForm.setValue('presentation', store.user.presentation);
            myForm.setValue('address.nationality', store.user.address.nationality);
            myForm.setValue('address.nation', store.user.address.nation);
            myForm.setValue('address.province', store.user.address.province);
            myForm.setValue('address.city', store.user.address.city);
            myForm.setValue('address.cap', store.user.address.cap);
            myForm.setValue('address.address', store.user.address.address);

            // As fields are valorized, we can calculate the percentage of completion rounded to the nearest integer
            let complete = 0;
            if (store.user.customizations?.profileImage) complete++;
            if (store.user.firstName) complete++;
            if (store.user.lastName) complete++;
            if (store.user.email) complete++;
            if (store.user.profession) complete++;
            if (store.user.slug) complete++;
            if (store.user.presentation) complete++;
            if (store.user.address.nationality) complete++;
            if (store.user.address.nation) complete++;
            if (store.user.address.province) complete++;
            if (store.user.address.city) complete++;
            if (store.user.address.cap) complete++;
            if (store.user.address.address) complete++;
            const notRounded = (complete * 100) / 13;
            setCompleteAt(Math.round(notRounded));
        }
    }, [store.user])

    function replaceAvatar() {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'profileImage';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length === 0) return;
            if (e.target.files[0].size > MAX_FILE_SIZE) {
                displayMessages([{ text: t('files.errors.too-large', { fileName: e.target.files[0].name, maxSize: MAX_FILE_SIZE / ONE_MB }), level: 'error' }]);
                return;
            }

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                trackPromise(
                    UserService.uploadAvatar(store.user.id, file)
                        .then(async response => {
                            const json = await response.json();
                            if (json.messages) {
                                displayMessages(json.messages);
                            }
                            UserService.invalidateCurrentUser();
                        }).catch(err => {
                            console.error('error', err);
                        })
                );
            }

            reader.readAsDataURL(file);
        });
    }

    function removeAvatar() {
        trackPromise(
            UserService.removeAvatar(store.user.id)
                .then(async response => {
                    const json = await response.json();
                    if (json.messages) {
                        displayMessages(json.messages);
                    }
                    UserService.invalidateCurrentUser();
                }).catch(err => {
                    console.error('error', err);
                })
        );
    }

    const MainBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom>
                        {t('user-profile.general-information.fields.profile-picture')}
                    </Typography>
                    <Box className='flex flex-row items-center justify-start mb-5'>
                        <Avatar alt="Profile Picture" src={avatar} sx={{ width: 76, height: 76 }} />

                        <Button variant="outlined" color='primary' size='small' sx={{ ml: 2 }} onClick={replaceAvatar}>
                            {t('labels.change')}
                        </Button>
                        <Button variant="outlined" color='text' size='small' sx={{ ml: 2 }} onClick={removeAvatar}>
                            {t('labels.remove')}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.first-name.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('firstName', { required: t('user-profile.general-information.fields.first-name.required') })}
                        error={myForm.formState.errors.firstName !== undefined}
                        helperText={myForm.formState.errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.last-name.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('lastName', { required: t('user-profile.general-information.fields.last-name.required') })}
                        error={myForm.formState.errors.lastName !== undefined}
                        helperText={myForm.formState.errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.email.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('email', { required: t('user-profile.general-information.fields.email.required') })}
                        error={myForm.formState.errors.email !== undefined}
                        helperText={myForm.formState.errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.profession.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('profession', { required: false })}
                        error={myForm.formState.errors.profession !== undefined}
                        helperText={myForm.formState.errors.profession?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.slug.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('slug', { required: t('user-profile.general-information.fields.slug.required') })}
                        error={myForm.formState.errors.slug !== undefined}
                        helperText={myForm.formState.errors.slug?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextArea
                        label={t('user-profile.general-information.fields.presentation.label')}
                        placeholder={t('user-profile.general-information.fields.presentation.placeholder')}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        {...myForm.register('presentation', { required: false })}
                        error={myForm.formState.errors.presentation !== undefined}
                        helperText={myForm.formState.errors.presentation?.message}
                    />
                </Grid>
            </Grid>
        )
    }

    const SecondaryBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.nationality.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.nationality', { required: false })}
                        error={myForm.formState.errors.nationality !== undefined}
                        helperText={myForm.formState.errors.nationality?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.nation.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.nation', { required: t('user-profile.general-information.fields.nation.required') })}
                        error={myForm.formState.errors.nation !== undefined}
                        helperText={myForm.formState.errors.nation?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.province.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.province', { required: t('user-profile.general-information.fields.province.required') })}
                        error={myForm.formState.errors.province !== undefined}
                        helperText={myForm.formState.errors.province?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.city.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.city', { required: t('user-profile.general-information.fields.city.required') })}
                        error={myForm.formState.errors.city !== undefined}
                        helperText={myForm.formState.errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.cap.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.cap', { required: t('user-profile.general-information.fields.cap.required') })}
                        error={myForm.formState.errors.cap !== undefined}
                        helperText={myForm.formState.errors.cap?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.address.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.address', { required: t('user-profile.general-information.fields.address.required') })}
                        error={myForm.formState.errors.address !== undefined}
                        helperText={myForm.formState.errors.address?.message}
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <ExpandableSection
            defaultExpanded
            mainTitle={t('user-profile.general-information.main-title')}
            secondaryTitle={t('user-profile.general-information.secondary-title')}
            badge={t('user-profile.general-information.percentage', { percentage: completeAt })}
            MainBody={<MainBody myForm={myForm} />}
            SecondaryBody={<SecondaryBody myForm={myForm} />}
        />
    )
}

const About = ({ myForm }) => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");

    useEffect(() => {
        if (store.user) {
            const customizations = store.user.customizations;

            myForm.setValue('customizations.CV.en', customizations?.CV?.en ?? '');
            myForm.setValue('customizations.CV.it', customizations?.CV?.it ?? '');

            myForm.setValue('customizations.socials.facebook', customizations?.socials?.facebook ?? '');
            myForm.setValue('customizations.socials.twitter', customizations?.socials?.twitter ?? '');
            myForm.setValue('customizations.socials.instagram', customizations?.socials?.instagram ?? '');
            myForm.setValue('customizations.socials.linkedin', customizations?.socials?.linkedin ?? '');
        }
    }, [store.user]);

    const MainBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");
        
        return (
            <>
                <h1>Sezione MainBody</h1>
            </>
        )
    }

    const SecondaryBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");

        const enCvLabel = t('user-profile.about.cv.en');
        const itCvLabel = t('user-profile.about.cv.it');

        const { field: fieldEn } = useController({
            control: myForm.control,
            name: 'customizations.CV.en'
        });

        const { field: fieldIt } = useController({
            control: myForm.control,
            name: 'customizations.CV.it'
        });

        function handleReplaceCV(file, label) {
            const lang = label === enCvLabel ? 'en' : 'it';
            trackPromise(
                UserService.uploadCV(store.user.id, file, lang)
                    .then(async response => {
                        const json = await response.json();
                        if (json.messages) {
                            displayMessages(json.messages);
                        }
                        UserService.invalidateCurrentUser();
                    }).catch(err => {
                        console.error('error', err);
                    })
            );
        }

        function handleRemoveCV(label) {
            const lang = label === enCvLabel ? 'en' : 'it';
            trackPromise(
                UserService.removeCV(store.user.id, lang)
                    .then(async response => {
                        const json = await response.json();
                        if (json.messages) {
                            displayMessages(json.messages);
                        }
                        UserService.invalidateCurrentUser();
                    }).catch(err => {
                        console.error('error', err);
                    })
            );
        }

        return (

            <>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography color='dark.main' fontWeight={theme => theme.typography.fontWeightMedium} className='!mt-5 !mb-5' >{t('user-profile.about.cv.title')}</Typography>
                        <Grid container spacing={2} marginY={4}>
                            <Grid item xs={12} sm={6}>
                                <CustomFileInput
                                    label={enCvLabel}
                                    field={fieldEn}
                                    replaceFile={handleReplaceCV}
                                    removeFile={handleRemoveCV}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomFileInput
                                    label={itCvLabel}
                                    field={fieldIt}
                                    replaceFile={handleReplaceCV}
                                    removeFile={handleRemoveCV}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography color='dark.main' fontWeight={theme => theme.typography.fontWeightMedium} className='!mt-5 !mb-5' >{t('user-profile.about.socials.title')}</Typography>
                        <Grid container spacing={2} marginY={4}>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    {...myForm.register('customizations.socials.facebook')}
                                    variant="outlined"
                                    placeholder='John.Doe'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Facebook />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    {...myForm.register('customizations.socials.twitter')}
                                    variant="outlined"
                                    placeholder='JohnDoe'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Twitter />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    {...myForm.register('customizations.socials.instagram')}
                                    variant="outlined"
                                    placeholder='johndoe'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Instagram />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    {...myForm.register('customizations.socials.linkedin')}
                                    variant="outlined"
                                    placeholder='john-doe'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LinkedIn />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>

        )
    }

    return (
        <ExpandableSection
            mainTitle={t('user-profile.about.main-title')}
            MainBody={<MainBody myForm={myForm} />}
            SecondaryBody={<SecondaryBody myForm={myForm} />}
        />
    )
}

const Skills = ({ myForm }) => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const userSkills = useMemo(() => store.user?.skills, [store.user?.skills]);
    const numberOfMain = 3;

    useEffect(() => {
        const existingSkills = userSkills ?? [];
        existingSkills.sort((a, b) => a.orderId - b.orderId);

        myForm.setValue('skills', existingSkills);
    }, [userSkills])

    function addNewSkill(value) {
        let newSkills = myForm.watch('skills') || [];

        // Check if the skill is already in the list
        if (newSkills.find(s => s?.skill?.id === value.id)) {
            displayMessages([{ text: t('skills.already-present'), level: 'info' }]);
            return;
        }

        const newSkill = {
            skill: value,
            isMain: newSkills.length < numberOfMain,
            orderId: newSkills.length + 1,
            userId: store.user.id
        }
        newSkills.push(newSkill);
        myForm.setValue('skills', newSkills);
    }

    return (
        <ExpandableSection
            mainTitle={t('user-profile.skills.main-title')}
            secondaryTitle={t('user-profile.skills.secondary-title')}
            badge={t('user-profile.skills.badge', { number: store.user.skills?.length ?? 0 })}
            info={t('user-profile.skills.info')}
            MainBody={<SkillsSearchSelect myForm={myForm} numberOfMain={numberOfMain} />}
            SecondaryBody={<NewSkill afterCreationAction={addNewSkill} />}
        />
    )
}


const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        backgroundColor: theme.palette.background.main,
    },
}));

// Create a styled version of the TextField to represent a textarea. Set the background color to the theme's background.main color and also remove the paddings:
const CustomTextArea = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        padding: 0,
    },
    '& .MuiInputBase-input': {
        backgroundColor: theme.palette.background.main,
        padding: '16.5px 14px',
    },
}));
