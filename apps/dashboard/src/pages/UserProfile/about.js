import { CustomTextField } from '@/components/Custom/FormComponents';
import CustomFileInput from '@/components/CustomFileInput';
import ExpandableSection from '@/components/ExpandableSection';
import MuiEditor from '@/components/MuiEditor';
import { Facebook, Info, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Tooltip, Typography, useMediaQuery } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDashboardStore } from "shared/stores/DashboardStore";
import DeleteUserProfile from './deleteUser';

const About = () => {
    const myForm = useFormContext();
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const isBiggerThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    const [defaultStory, setDefaultStory] = useState('');

    useEffect(() => {
        if (store.user) {
            const customizations = store.user.customizations;
            const mainDiary = store.user.diaries.find(d => d.isMain);
            const mainStory = mainDiary?.stories.find(s => s.id === store.user.mainStoryId);

            customizations?.CV?.en !== undefined && customizations?.CV?.en != null ? myForm.setValue('customizations.CV.en', customizations?.CV?.en) : undefined;
            customizations?.CV?.it !== undefined && customizations?.CV?.it != null ? myForm.setValue('customizations.CV.it', customizations?.CV?.it) : undefined;
            mainStory !== undefined && mainStory != null ? myForm.setValue('customizations.mainStory', mainStory.description) : null;
            setDefaultStory(mainStory.description ?? '');

        }
    }, [store.user]);

    const MainBody = () => {
        const myForm = useFormContext();
        const { t } = useTranslation("dashboard");

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

                <Controller
                    control={myForm.control}
                    name="customizations.mainStory"
                    defaultValue={defaultStory}
                    rules={{ required: t('user-profile.about.main-story-required') }}
                    render={({ field, fieldState: { error } }) => (
                        <MuiEditor
                            useComplete={false}
                            existingText={field?.value}
                            onChange={field.onChange}
                            error={!!error}
                            showFooter={true}
                            showAIButton={true}
                        />
                    )}
                />
            </>
        )
    }

    const SecondaryBody = () => {
        const myForm = useFormContext();
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

            if (file) {
                if (lang === 'en') {
                    myForm.setValue('customizations.CV.en', file.url);
                } else {
                    myForm.setValue('customizations.CV.it', file.url);
                }
            }
        }

        return (

            <>

                <Box className={`w-full flex ${isBiggerThanXl ? 'flex-row' : 'flex-col'} gap-x-8 items-start justify-start`}>

                    <Box className='w-full max-w-md flex flex-col items-start justify-start'>
                        <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className='!mt-5 !mb-10' >{t('user-profile.about.cv.title')}</Typography>
                        <Box className='w-full max-w-md flex flex-col sm:flex-row gap-x-4 items-start justify-start mt-4 gap-y-8'>
                            <CustomFileInput
                                label={enCvLabel}
                                field={fieldEn}
                                replaceFile={handleReplaceCV}
                                rootClassName='w-full'
                            />
                            <CustomFileInput
                                label={itCvLabel}
                                field={fieldIt}
                                replaceFile={handleReplaceCV}
                                rootClassName='w-full'
                            />
                        </Box>
                    </Box>

                    <Box className='w-full max-w-md flex flex-col items-start justify-start'>
                        <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className={isBiggerThanXl ? '!mt-5 !mb-10' : '!mt-10'}>{t('user-profile.about.socials.title')}</Typography>
                        <Box className='w-full max-w-md flex flex-col gap-y-4 items-start justify-start mt-4'>
                            <Controller
                                control={myForm.control}
                                name="customizations.socials.facebook"
                                defaultValue={store.user.customizations?.socials?.facebook ?? ''}
                                render={({ field, fieldState: { error } }) => (
                                    <CustomTextField
                                        placeholder='John.Doe'
                                        variant="outlined"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || ''}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Facebook />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={myForm.control}
                                name="customizations.socials.twitter"
                                defaultValue={store.user.customizations?.socials?.twitter ?? ''}
                                render={({ field, fieldState: { error } }) => (
                                    <CustomTextField
                                        placeholder='JohnDoe'
                                        variant="outlined"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || ''}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Twitter />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={myForm.control}
                                name="customizations.socials.instagram"
                                defaultValue={store.user.customizations?.socials?.instagram ?? ''}
                                render={({ field, fieldState: { error } }) => (
                                    <CustomTextField
                                        placeholder='johndoe'
                                        variant="outlined"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || ''}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Instagram />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={myForm.control}
                                name="customizations.socials.linkedin"
                                defaultValue={store.user.customizations?.socials?.linkedin ?? ''}
                                render={({ field, fieldState: { error } }) => (
                                    <CustomTextField
                                        placeholder='john-doe'
                                        variant="outlined"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || ''}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LinkedIn />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                        </Box>
                    </Box>

                    <Box className='w-full max-w-md flex flex-col items-start justify-start'>
                        <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className='!mt-5 !mb-10' >{t('user-profile.about.other.title')}</Typography>
                        <DeleteUserProfile fullName={`${store.user.firstName} ${store.user.lastName}`} />
                    </Box>

                </Box>
            </>

        )
    }

    return (
        <ExpandableSection
            mainTitle={t('user-profile.about.main-title')}
            MainBody={<MainBody />}
            SecondaryBody={<SecondaryBody />}
        />
    )
}

export default About;