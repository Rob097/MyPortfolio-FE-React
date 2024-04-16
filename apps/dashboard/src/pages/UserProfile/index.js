import ExpandableSection from '@/components/ExpandableSection';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { UserService } from "@/services/user.service";
import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { trackPromise } from 'react-promise-tracker';
import { useDashboardStore } from "shared/stores/DashboardStore";

const UserProfile = () => {
    const [store, dispatch] = useDashboardStore();
    const myForm = useForm(); //{ register, handleSubmit, setValue, getValues, watch, formState: { errors }, reset }
    const [avatarToUpdate, setAvatarToUpdate] = useState(null);

    function handleSubmit(data) {
        data.customizations.profileImage = JSON.parse(store.user.customizations)?.profileImage;

        // Update the user's profile
        trackPromise(
            UserService.updateSomeData(store.user, data)
                .then((response) => {
                    // If the avatar has changed, upload the new image
                    if (avatarToUpdate != null) {
                        trackPromise(
                            UserService.uploadAvatar(store.user.id, avatarToUpdate)
                                .then(async response => {
                                    const json = await response.json();
                                    if (json.messages) {
                                        displayMessages(json.messages);
                                    }
                                }).catch(err => {
                                    console.error('error', err);
                                })
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        );

    }

    return (
        <>
            <h1>My Profile</h1>
            <Box component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate sx={{ mt: 1 }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Save
                </Button>
                <GeneralInformation myForm={myForm} setAvatarToUpdate={setAvatarToUpdate} />
                <Skills myForm={myForm} />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Save
                </Button>
            </Box>
        </>
    )
}

export default UserProfile;

const GeneralInformation = ({ myForm, setAvatarToUpdate }) => {
    const [store, dispatch] = useDashboardStore();
    const [completeAt, setCompleteAt] = useState(0);
    const avatar = myForm.watch('customizations.profileImage');

    useEffect(() => {
        if (store.user) {
            myForm.setValue('customizations.profileImage', (JSON.parse(store.user.customizations)?.profileImage ?? ''));
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
            if (store.user.avatar) complete++;
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

    function handleReplaceAvatar() {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'profileImage';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.addEventListener('change', (e) => {
            console.log('Event: ', e.target.files);
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                setAvatarToUpdate(file);
                myForm.setValue('customizations.profileImage', reader.result);
            }

            reader.readAsDataURL(file);
        });
    }

    function handleRemoveAvatar() {
        myForm.setValue('customizations.profileImage', '');
    }

    const MainBody = ({ myForm }) => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom>
                        Profile Picture
                    </Typography>
                    <Box className='flex flex-row items-center justify-start mb-5'>
                        <Avatar alt="Profile Picture" src={avatar} sx={{ width: 76, height: 76 }} />


                        {/* Display two inline buttons: Change, Remove */}
                        <Button variant="outlined" color='primary' size='small' sx={{ ml: 2 }} onClick={handleReplaceAvatar}>
                            Change
                        </Button>
                        <Button variant="outlined" color='text' size='small' sx={{ ml: 2 }} onClick={handleRemoveAvatar}>
                            Remove
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('firstName', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('lastName', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('email', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Profession"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('profession', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Slug"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('slug', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextArea
                        label="Presentation"
                        placeholder='Write here something about you...'
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        {...myForm.register('presentation', { required: true })}
                    />
                </Grid>
            </Grid>
        )
    }

    const SecondaryBody = ({ myForm }) => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        error={myForm.formState.errors.nationality !== undefined}
                        {...myForm.register('address.nationality', { required: 'Field nationality is required' })}
                        helperText={myForm.formState.errors.nationality?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.nation', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="State / Province"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.province', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.city', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="ZIP / CAP"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.cap', { required: true })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        {...myForm.register('address.address', { required: true })}
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <ExpandableSection mainTitle="General information" secondaryTitle="Address" badge={`${completeAt}% complete`} MainBody={<MainBody myForm={myForm} />} SecondaryBody={<SecondaryBody myForm={myForm} />} />
    )
}

const Skills = ({ myForm }) => {
    const [store, dispatch] = useDashboardStore();
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
            displayMessages([{ text: 'Skill già presente', level: 'info' }]);
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
            mainTitle="Skills"
            secondaryTitle="New Skill"
            badge={`${store.user.skills?.length} skills`}
            info="The first three are the main skills"
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
