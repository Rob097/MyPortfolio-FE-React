import { displayMessages } from '@/components/alerts';
import { StoryService } from "@/services/story.service";
import { UserService } from "@/services/user.service";
import { Save } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useBlocker } from 'react-router-dom';
import { useDashboardStore } from "shared/stores/DashboardStore";
import About from './about';
import GeneralInformation from './generalInformation';
import Plan from './plan';
import Skills from './skills';

const UserProfile = () => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const myForm = useForm(); //{ register, handleSubmit, setValue, getValues, watch, formState: { errors }, reset }

    function handleSubmit(data) {

        if (data.customizations.CV) {
            // check every key and if the value is null or undefined, delete it:
            Object.keys(data.customizations.CV).forEach(key => {
                if (data.customizations.CV[key] == null || data.customizations.CV[key] === undefined) {
                    delete data.customizations.CV[key];
                }
            });
        }


        if (data.skills?.length < 3) {
            displayMessages([{ text: t('user-profile.skills.at-least-three'), level: 'error' }]);
            return;
        }

        if (!data.customizations.mainStory) {
            displayMessages([{ text: t('user-profile.about.main-story-required'), level: 'error' }]);
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
            const mainStory = store.user
                ?.diaries?.find(d => d?.isMain)
                ?.stories?.find(s => s?.id === store.user?.mainStoryId);
            mainStory.description = data.customizations.mainStory;
            trackPromise(
                StoryService.update(mainStory)
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
            dataToCheck[key] = cloneDeep(store.user[key]);
        });

        // for all keys of customizations.CV of data, if dataToCheck does not have the key, add it with undefined value:
        if (data.customizations?.CV) {
            Object.keys(data.customizations.CV).forEach(key => {
                if(data.customizations.CV[key] == null) {
                    data.customizations.CV[key] = undefined;
                }
                if (!dataToCheck.customizations.CV[key]) {
                    dataToCheck.customizations.CV[key] = undefined;
                }
            });
        }

        // delete the main story from the data object (checked separately)
        delete data.customizations.mainStory;

        const test = JSON.stringify(dataToCheck) !== JSON.stringify(data);
        if (test) console.log('dataToCheck', dataToCheck, 'data', data);
        return test;
    }

    // Check if the main story has changed
    function hasMainStoryChanged() {
        const data = cloneDeep(myForm.getValues());
        const test = data.customizations.mainStory !== undefined
            && data.customizations.mainStory !== store.user?.diaries
                ?.find(d => d.isMain)?.stories
                ?.find(s => s.id === store.user?.mainStoryId)
                ?.description;

        if (test) console.log('mainStory editor', data.customizations.mainStory, 'mainStory', store.user?.diaries?.find(d => d.isMain)?.stories?.find(s => s.id === store.user?.mainStoryId)?.description);
        return test;
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
            <FormProvider {...myForm}>
                <Box component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate sx={{ mt: 1 }}>
                    <Box className='flex flex-row items-center justify-between'>
                        <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >{t('user-profile.title')}</Typography>
                    </Box>
                    <GeneralInformation />
                    <About />
                    <Skills />
                    <Plan />
                    <Tooltip title={myForm.formState.isValid ? t('labels.save') : 'Fill all the required fields'} placement='top' arrow>
                        <span className='fixed bottom-6 right-6' style={{ zIndex: 9 }}>
                            <Fab color="primary" aria-label="save" onClick={myForm.handleSubmit(handleSubmit)} disabled={!myForm.formState.isValid}>
                                <Save className='text-white' />
                            </Fab>
                        </span>
                    </Tooltip>
                </Box>
            </FormProvider>
        </>
    )
}

export default UserProfile;