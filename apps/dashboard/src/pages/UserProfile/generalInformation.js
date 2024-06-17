import { CustomTextArea, CustomTextField } from '@/components/Custom/FormComponents';
import ExpandableSection from '@/components/ExpandableSection';
import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { REPLACE_MEDIA_MANAGER, useDashboardStore } from "shared/stores/DashboardStore";

const GeneralInformation = () => {
    const myForm = useFormContext();
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

    function changeAvatar() {
        dispatch({ type: REPLACE_MEDIA_MANAGER, payload: { open: true, onlyImages: true, onSelect: setAvatar } });
    }

    function setAvatar(file) {
        myForm.setValue('customizations.profileImage', (file?.url ?? null));
    }

    const MainBody = () => {
        const myForm = useFormContext();
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

                            <Button variant="outlined" color='primary' size='small' sx={{ ml: 2 }} onClick={changeAvatar}>
                                {t('labels.change')}
                            </Button>
                            <Button variant="outlined" color='text' size='small' sx={{ ml: 2 }} onClick={() => setAvatar(null)}>
                                {t('labels.remove')}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            control={myForm.control}
                            name="firstName"
                            rules={{ required: t('user-profile.general-information.fields.first-name.required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('user-profile.general-information.fields.first-name.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            control={myForm.control}
                            name="lastName"
                            rules={{ required: t('user-profile.general-information.fields.last-name.required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('user-profile.general-information.fields.last-name.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            control={myForm.control}
                            name="email"
                            rules={{ required: t('user-profile.general-information.fields.email.required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('user-profile.general-information.fields.email.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} className='pt-8'>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Controller
                                    control={myForm.control}
                                    name="profession"
                                    render={({ field, fieldState: { error } }) => (
                                        <CustomTextField
                                            label={t('user-profile.general-information.fields.profession.label')}
                                            variant="outlined"
                                            fullWidth
                                            error={!!error}
                                            helperText={error?.message}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={myForm.control}
                                    name="slug"
                                    rules={{ required: t('user-profile.general-information.fields.slug.required') }}
                                    render={({ field, fieldState: { error } }) => (
                                        <CustomTextField
                                            label={t('user-profile.general-information.fields.slug.label')}
                                            variant="outlined"
                                            fullWidth
                                            error={!!error}
                                            helperText={error?.message}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            value={field.value || ''}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Controller
                            control={myForm.control}
                            name="presentation"
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextArea
                                    label={t('user-profile.general-information.fields.presentation.label')}
                                    placeholder={t('user-profile.general-information.fields.presentation.placeholder')}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

            </>
        )
    }

    const SecondaryBody = () => {
        const myForm = useFormContext();
        const { t } = useTranslation("dashboard");
        return (
            <>
                <Grid container spacing={4}>
                    {[
                        { name: 'address.nationality', required: false, label: 'user-profile.general-information.fields.nationality.label' },
                        { name: 'address.nation', required: true, label: 'user-profile.general-information.fields.nation.label' },
                        { name: 'address.province', required: true, label: 'user-profile.general-information.fields.province.label' },
                        { name: 'address.city', required: true, label: 'user-profile.general-information.fields.city.label' },
                        { name: 'address.cap', required: true, label: 'user-profile.general-information.fields.cap.label' },
                        { name: 'address.address', required: true, label: 'user-profile.general-information.fields.address.label' },
                    ].map(({ name, required, label }) => (
                        <Grid item xs={12} sm={6} lg={4} key={name}>
                            <Controller
                                control={myForm.control}
                                name={name}
                                rules={{ required: required ? t(`${label}.required`) : false }}
                                render={({ field, fieldState: { error } }) => (
                                    <CustomTextField
                                        label={t(label)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || ''}
                                    />
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <ExpandableSection
            defaultExpanded
            mainTitle={t('user-profile.general-information.main-title')}
            secondaryTitle={t('user-profile.general-information.secondary-title')}
            badge={t('user-profile.general-information.percentage', { percentage: completeAt })}
            MainBody={<MainBody />}
            SecondaryBody={<SecondaryBody />}
        />
    )
}

export default GeneralInformation;