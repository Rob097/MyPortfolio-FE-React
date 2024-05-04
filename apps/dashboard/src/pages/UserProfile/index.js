import CustomFileInput from '@/components/CustomFileInput';
import { CustomTextArea, CustomTextField } from '@/components/CustomForm';
import ExpandableSection from '@/components/ExpandableSection';
import MuiEditor from '@/components/MuiEditor';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { StoryService } from "@/services/story.service";
import { UserService } from "@/services/user.service";
import { Facebook, Info, Instagram, LinkedIn, Save, Twitter } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useBlocker } from 'react-router-dom';
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

        if (data.skills?.length < 3) {
            displayMessages([{ text: t('user-profile.skills.at-least-three'), level: 'error' }]);
            return;
        }

        const isMainStoryToUpdate = hasMainStoryChanged();
        const isUserToUpdate = hasUserInfoChanged();

        // If there are no changes, don't update the user's profile
        if (!isMainStoryToUpdate && !isUserToUpdate) {
            displayMessages([{ text: t('user-profile.no-changes-to-save'), level: 'info' }]);
            return;
        }

        // Update the main story
        if (isMainStoryToUpdate) {
            trackPromise(
                StoryService.update(data.customizations.mainStory)
                    .then(async response => {
                        if (response.messages?.length === 0 && !isUserToUpdate) {
                            displayMessages([{ text: t('services.story.update.ok'), level: 'success' }]);
                        }
                        UserService.invalidateCurrentUser();
                    }).catch(err => {
                        console.error('error', err);
                        displayMessages([{ text: t('services.story.update.ko'), level: 'error' }]);
                    })
            );
        }

        // Update the user's profile
        if (isUserToUpdate) {
            delete data.customizations.mainStory;
            trackPromise(
                UserService.updateSomeData(store.user, data)
                    .then((response) => {
                        console.log(response);
                        if (response.messages?.length === 0) {
                            displayMessages([{ text: t('services.user.update.ok'), level: 'success' }]);
                        }
                        UserService.invalidateCurrentUser();
                    })
                    .catch((error) => {
                        console.log(error);
                        displayMessages([{ text: t('services.user.update.ko'), level: 'error' }]);
                    })
            );
        }

    }

    // Check if the user's info has changed
    function hasUserInfoChanged() {
        const data = cloneDeep(myForm.getValues());
        const dataToCheck = {};
        Object.keys(data).forEach(key => {
            if (key !== 'customizations.profileImage' && key !== 'customizations.CV') {
                dataToCheck[key] = store.user[key];
            } else {
                dataToCheck[key] = data[key];
            }
        });
        return JSON.stringify(dataToCheck) !== JSON.stringify(data);
    }

    // Check if the main story has changed
    function hasMainStoryChanged() {
        const data = cloneDeep(myForm.getValues());
        return data.customizations.mainStory !== undefined
            && data.customizations.mainStory.description !== store.user?.diaries
                ?.find(d => d.isMain)?.stories
                ?.find(s => s.id === store.user?.mainStoryId)
                ?.description;
    }

    // If the user tries to leave the page with unsaved changes, ask for confirmation
    let blocker = useBlocker(() => hasUserInfoChanged() || hasMainStoryChanged());
    useEffect(() => {
        if (blocker?.state === "blocked") {
            if (window.confirm(t('user-profile.unsaved-changes'))) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker?.state]);

    return (
        <>
            <Box component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate sx={{ mt: 1 }}>
                <Box className='flex flex-row items-center justify-between'>
                    <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >{t('user-profile.title')}</Typography>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} startIcon={<Save />}>
                        {t('labels.save')}
                    </Button>
                </Box>
                <GeneralInformation myForm={myForm} />
                <About myForm={myForm} />
                <Skills myForm={myForm} />
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
            store.user.customizations?.profileImage !== undefined && store.user.customizations?.profileImage != null ? myForm.setValue('customizations.profileImage', (store.user.customizations?.profileImage)) : null;
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
            <>
                <Grid container spacing={4}>
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
                    <Grid item xs={12} md={4}>
                        <CustomTextField
                            label={t('user-profile.general-information.fields.first-name.label')}
                            variant="outlined"
                            fullWidth
                            {...myForm.register('firstName', { required: t('user-profile.general-information.fields.first-name.required') })}
                            error={myForm.formState.errors.firstName !== undefined}
                            helperText={myForm.formState.errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CustomTextField
                            label={t('user-profile.general-information.fields.last-name.label')}
                            variant="outlined"
                            fullWidth
                            {...myForm.register('lastName', { required: t('user-profile.general-information.fields.last-name.required') })}
                            error={myForm.formState.errors.lastName !== undefined}
                            helperText={myForm.formState.errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CustomTextField
                            label={t('user-profile.general-information.fields.email.label')}
                            variant="outlined"
                            fullWidth
                            {...myForm.register('email', { required: t('user-profile.general-information.fields.email.required') })}
                            error={myForm.formState.errors.email !== undefined}
                            helperText={myForm.formState.errors.email?.message}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} className='pt-8'>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    label={t('user-profile.general-information.fields.profession.label')}
                                    variant="outlined"
                                    fullWidth
                                    {...myForm.register('profession', { required: false })}
                                    error={myForm.formState.errors.profession !== undefined}
                                    helperText={myForm.formState.errors.profession?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    label={t('user-profile.general-information.fields.slug.label')}
                                    variant="outlined"
                                    fullWidth
                                    {...myForm.register('slug', { required: t('user-profile.general-information.fields.slug.required') })}
                                    error={myForm.formState.errors.slug !== undefined}
                                    helperText={myForm.formState.errors.slug?.message}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
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
            </>
        )
    }

    const SecondaryBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.nationality.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.nationality', { required: false })}
                        error={myForm.formState.errors.nationality !== undefined}
                        helperText={myForm.formState.errors.nationality?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.nation.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.nation', { required: t('user-profile.general-information.fields.nation.required') })}
                        error={myForm.formState.errors.nation !== undefined}
                        helperText={myForm.formState.errors.nation?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.province.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.province', { required: t('user-profile.general-information.fields.province.required') })}
                        error={myForm.formState.errors.province !== undefined}
                        helperText={myForm.formState.errors.province?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.city.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.city', { required: t('user-profile.general-information.fields.city.required') })}
                        error={myForm.formState.errors.city !== undefined}
                        helperText={myForm.formState.errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <CustomTextField
                        label={t('user-profile.general-information.fields.cap.label')}
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.cap', { required: t('user-profile.general-information.fields.cap.required') })}
                        error={myForm.formState.errors.cap !== undefined}
                        helperText={myForm.formState.errors.cap?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
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
    const isBiggerThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    useEffect(() => {
        if (store.user) {
            const customizations = store.user.customizations;

            customizations?.CV?.en !== undefined && customizations?.CV?.en != null ? myForm.setValue('customizations.CV.en', customizations?.CV?.en) : null;
            customizations?.CV?.it !== undefined && customizations?.CV?.it != null ? myForm.setValue('customizations.CV.it', customizations?.CV?.it) : null;

            myForm.setValue('customizations.socials.facebook', customizations?.socials?.facebook ?? '');
            myForm.setValue('customizations.socials.twitter', customizations?.socials?.twitter ?? '');
            myForm.setValue('customizations.socials.instagram', customizations?.socials?.instagram ?? '');
            myForm.setValue('customizations.socials.linkedin', customizations?.socials?.linkedin ?? '');
        }
    }, [store.user]);

    const MainBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");

        const currentMainStory = useMemo(() => (
            store.user
                ?.diaries?.find(d => d?.isMain)
                ?.stories?.find(s => s?.id === store.user?.mainStoryId)
        ), [store.user.diaries, store.user.mainStoryId]);

        function handleEditorChange(content) {
            const newStory = { ...currentMainStory, description: content };
            myForm.setValue('customizations.mainStory', newStory);
        }

        function handleSave(data) {
            if (!currentMainStory) {
                displayMessages([{ text: t('user-profile.about.main-story-not-found'), level: 'error' }]);
                return;
            }
            currentMainStory.description = data;

            trackPromise(
                StoryService.update(currentMainStory)
                    .then(async response => {
                        if (response.messages?.length === 0) {
                            displayMessages([{ text: t('services.story.update.ok'), level: 'success' }]);
                        }
                        UserService.invalidateCurrentUser();
                    }).catch(err => {
                        console.error('error', err);
                        displayMessages([{ text: t('services.story.update.ko'), level: 'error' }]);
                    })
            );

        }

        return (
            <>
                <Box className='w-fit flex flex-row items-center justify-center'>
                    <Typography variant="h5" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom className='w-fit mr-2'>
                        {t('user-profile.about.your-story')}
                    </Typography>
                    <Tooltip title={t('user-profile.about.your-story-info')} arrow placement={isBiggerThanSm ? 'right-end' : 'bottom'}>
                        <Info color='primary' className='ml-2' />
                    </Tooltip>
                </Box>
                <MuiEditor useComplete={false} existingText={currentMainStory?.description ?? ''} handleSave={handleSave} onChange={handleEditorChange} />
            </>
        )
    }

    const SecondaryBody = ({ myForm }) => {
        const { t } = useTranslation("dashboard");
        const isBiggerThanXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));

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

                <Box className={`w-full flex ${isBiggerThanXl ? 'flex-row' : 'flex-col'} gap-x-8 items-start justify-start`}>

                    <Box className='w-full max-w-md flex flex-col items-start justify-start'>
                        <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className='!mt-5 !mb-10' >{t('user-profile.about.cv.title')}</Typography>
                        <Box className='w-full max-w-md flex flex-row gap-x-4 items-start justify-start mt-4'>
                            <CustomFileInput
                                label={enCvLabel}
                                field={fieldEn}
                                replaceFile={handleReplaceCV}
                                removeFile={handleRemoveCV}
                                rootClassName='w-full'
                            />
                            <CustomFileInput
                                label={itCvLabel}
                                field={fieldIt}
                                replaceFile={handleReplaceCV}
                                removeFile={handleRemoveCV}
                                rootClassName='w-full'
                            />
                        </Box>
                    </Box>

                    <Box className='w-full max-w-md flex flex-col items-start justify-start'>
                        <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className={isBiggerThanXl ? '!mt-5 !mb-10' : '!mt-10'}>{t('user-profile.about.socials.title')}</Typography>
                        <Box className='w-full max-w-md flex flex-col gap-y-4 items-start justify-start mt-4'>
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
                        </Box>
                    </Box>
                </Box>
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