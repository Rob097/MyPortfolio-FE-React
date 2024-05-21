import CreateOrEditStory from '@/components/CreateOrEditStory';
import { CustomCard, CustomCardContent } from '@/components/Custom/CardComponents';
import ExpandableSection from '@/components/ExpandableSection';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { EntityTypeEnum } from '@/models/categories.model';
import { EducationSpecificFields } from '@/pages/Educations/edit';
import { ExperienceSpecificFields } from '@/pages/Experiences/edit';
import { ProjectSpecificFields } from '@/pages/Projects/edit';
import { EntityService } from '@/services/entity.service';
import { DATE_TO_SAVE_FORMAT } from '@/utilities';
import { Add, Save } from '@mui/icons-material';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import _, { cloneDeep } from 'lodash';
import moment from 'moment';
import 'moment/locale/it';
// import 'moment/locale/en-us';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { View } from "shared/utilities/criteria";
import CoverImage from './coverImage';
import StoriesList from './storiesList';

const CreateOrEditEntity = (props) => {
    const [store, dispatch] = useDashboardStore();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation("dashboard");
    const { slug: entitySlug } = useParams();
    const entitiesType = props.entitiesType;

    // if the current lang is italian use the italian locale for moment, otherwise use the default one
    const dateLocale = useMemo(() => i18n.language === 'it' ? 'it' : 'en-us', [i18n.language]);

    if (!entitySlug) {
        displayMessages([{ text: `${EntityTypeEnum.getLabel(entitiesType, false, true)} ID is required`, level: 'error' }]);
        navigate(`/dashboard/${EntityTypeEnum.getLabel(entitiesType, true, false)}`);
    }
    const isCreate = useMemo(() => entitySlug === 'new', [entitySlug]);
    const [originalEntity, setOriginalEntity] = useState(null);

    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [storyToEdit, setStoryToEdit] = useState(null);
    const [isAddingNewStory, setIsAddingNewStory] = useState(false);

    // Fetch the entity if it's not a new one
    useEffect(() => {
        if (!isCreate) {
            fetchEntity();
        }
    }, [entitySlug, isCreate]);

    const orderField = useMemo(() => {
        switch (entitiesType) {
            case EntityTypeEnum.PROJECTS:
                return 'orderInProject';
            case EntityTypeEnum.EXPERIENCES:
                return 'orderInExperience';
            case EntityTypeEnum.EDUCATIONS:
                return 'orderInEducation';
            default:
                throw new Error(`Unsupported entitiesType: ${entitiesType}`);
        }
    }, [entitiesType]);

    const myForm = useFormContext();
    const formTitle = myForm.watch('title');
    const formField = myForm.watch('field');


    // Form functions -- BEGIN
    function handleSubmit(data) {
        const { coverImage, stories, skills, published, description, fromDate, toDate, status, ...rest } = data;
        const formattedSkills = skills?.map(s => s.skill);

        const formattedStories = stories?.map((story, index) => {
            const formattedStory = {
                ...story,
                fromDate: moment(story.fromDate).format(DATE_TO_SAVE_FORMAT),
                toDate: story.toDate ? moment(story.toDate).format(DATE_TO_SAVE_FORMAT) : null
            };

            if (formattedStory.connectedProject) {
                if (formattedStory.connectedProject.id && !formattedStory.projectId) {
                    formattedStory.projectId = formattedStory.connectedProject.id;
                }
                delete formattedStory.connectedProject;
            }

            if (formattedStory.connectedEducation) {
                if (formattedStory.connectedEducation.id && !formattedStory.educationId) {
                    formattedStory.educationId = formattedStory.connectedEducation.id;
                }
                delete formattedStory.connectedEducation;
            }

            if (formattedStory.connectedExperience) {
                if (formattedStory.connectedExperience.id && !formattedStory.experienceId) {
                    formattedStory.experienceId = formattedStory.connectedExperience.id;
                }
                delete formattedStory.connectedExperience;
            }

            formattedStory[orderField] = formattedStory.tmpOrder;
            delete formattedStory.tmpOrder;

            delete formattedStory.tmpId;
            return formattedStory;
        });

        let entity = {
            userId: store.user.id,
            published,
            description,
            fromDate: moment(fromDate).format(DATE_TO_SAVE_FORMAT),
            toDate: toDate ? moment(toDate).format(DATE_TO_SAVE_FORMAT) : null,
            status,
            stories: formattedStories,
            skills: formattedSkills,
            ...rest
        };

        if (!isCreate && originalEntity) {
            entity = { ...originalEntity, ...entity };
        }

        const entityPromise = isCreate ? EntityService.create(entitiesType, entity) : EntityService.update(entitiesType, entity);
        const successMessage = isCreate ? `${EntityTypeEnum.getLabel(entitiesType, false, true)} created successfully` : `${EntityTypeEnum.getLabel(entitiesType, false, true)} updated successfully`;
        const errorMessage = isCreate ? `Error while creating the ${EntityTypeEnum.getLabel(entitiesType, false, false)}` : `Error while updating the ${EntityTypeEnum.getLabel(entitiesType, false, false)}`;

        trackPromise(
            entityPromise.then((response) => {
                displayMessages([{ text: successMessage, level: 'success' }]);

                if (coverImage && coverImage !== originalEntity?.coverImage) {
                    return trackPromise(
                        EntityService.uploadCoverImage(entitiesType, response.content.id, coverImage).then(() => {
                            displayMessages([{ text: 'Cover image uploaded successfully', level: 'success' }]);
                            if (isCreate) {
                                navigate(`/dashboard/${EntityTypeEnum.getLabel(entitiesType, true, false)}/${response.content.slug}`);
                            } else {
                                fetchEntity();
                            }
                        })
                    );
                } else if (originalEntity?.coverImage && !coverImage) {
                    return trackPromise(
                        EntityService.removeCoverImage(entitiesType, response.content.id).then(() => {
                            displayMessages([{ text: 'Cover image removed successfully', level: 'success' }]);
                            if (isCreate) {
                                navigate(`/dashboard/${EntityTypeEnum.getLabel(entitiesType, true, false)}/${response.content.slug}`);
                            } else {
                                fetchEntity();
                            }
                        })
                    );
                } else {
                    if (isCreate) {
                        navigate(`/dashboard/${EntityTypeEnum.getLabel(entitiesType, true, false)}/${response.content.slug}`);
                    } else {
                        fetchEntity();
                    }
                }

            }).catch((error) => {
                displayMessages([{ text: errorMessage, level: 'error' }]);
                console.error(error);
            })
        );
    }

    function fetchEntity() {
        trackPromise(
            EntityService.getBySlug(entitiesType, entitySlug, View.verbose).then((response) => {
                const implementationClass = EntityTypeEnum.getClass(entitiesType);
                const entity = new implementationClass(response.content);
                if (entity) {
                    const stories = entity.stories.sort((a, b) => a[orderField] - b[orderField]);
                    const skills = entity.skills?.map(s => ({ skill: s }));
                    const coverImage = entity.coverImage;
                    const values = {
                        published: entity.published,
                        fromDate: moment(entity.fromDate),
                        toDate: entity.toDate ? moment(entity.toDate) : null,
                        description: entity.description,
                        stories: stories,
                        skills: skills,
                        coverImage: coverImage,
                        status: entity.status
                    };
                    if (entitiesType === EntityTypeEnum.PROJECTS) {
                        values.title = entity.title;
                    } else if (entitiesType === EntityTypeEnum.EXPERIENCES) {
                        values.title = entity.title;
                        values.employmentType = entity.employmentType;
                        values.companyName = entity.companyName;
                        values.location = entity.location;
                    } else if (entitiesType === EntityTypeEnum.EDUCATIONS) {
                        values.field = entity.field;
                        values.school = entity.school;
                        values.degree = entity.degree;
                        values.grade = entity.grade;
                    }

                    myForm.reset(values);
                    setOriginalEntity(entity);
                    setCoverImageUrl(coverImage);
                }
            }).catch((error) => {
                displayMessages([{ text: `Error while fetching the ${EntityTypeEnum.getLabel(entitiesType, false, false)}`, level: 'error' }]);
                console.error(error);
            })
        );
    }

    function addNewSkill(value) {
        let newSkills = myForm.watch('skills') || [];

        // Check if the skill is already in the list
        if (newSkills.find(s => s?.skill?.id === value.id)) {
            displayMessages([{ text: t('skills.already-present'), level: 'info' }]);
            return;
        }

        const newSkill = {
            skill: value,
            isMain: false,
            orderId: undefined,
            userId: store.user.id
        }
        newSkills.push(newSkill);
        myForm.setValue('skills', newSkills);
    }
    // Form functions -- END

    // Generic functions -- BEGIN
    function toggleStoriesMode(isToAddNewStory) {
        setIsAddingNewStory(isToAddNewStory);
        if (!isToAddNewStory) {
            setStoryToEdit(null);
        }
        // scroll to #stories-section:
        const storiesSection = document.getElementById('stories-section');
        if (storiesSection) {
            storiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function handleEditStory(story) {
        setStoryToEdit(story);
        setIsAddingNewStory(true);
    }

    function hasUnsavedChanges() {

        if (isCreate) {
            console.log('isCreate', isCreate);
            console.log('myForm.formState.isDirty', myForm.formState.isDirty);
            console.log('myForm.formState.isValid', myForm.formState.isValid);
            return myForm.formState.isDirty && !myForm.formState.isValid;
        }

        return Object.keys(originalEntity).some(key => {
            const actualValue = myForm.getValues(key);
            const originalValue = originalEntity[key];

            // fields to skip
            const fieldsToSkip = ['id', 'slug', 'userId', 'createdAt', 'updatedAt'];
            if (fieldsToSkip.includes(key)) {
                return false;
            }

            // if the field is a date, compare the formatted date
            if (key === 'fromDate' || key === 'toDate') {
                if (actualValue && originalValue) {
                    const hasChanged = moment(actualValue).format(DATE_TO_SAVE_FORMAT) !== moment(originalValue).format(DATE_TO_SAVE_FORMAT);
                    if (hasChanged) {
                        console.log(`Field ${key} has changed`, moment(actualValue).format(DATE_TO_SAVE_FORMAT), moment(originalValue).format(DATE_TO_SAVE_FORMAT));
                    }
                    return hasChanged;
                }
                const hasChanged = Boolean(actualValue || originalValue);
                if (hasChanged) {
                    console.log(`Field ${key} has changed`, actualValue, originalValue);
                }
                return hasChanged;
            } else if (key === 'skills') {
                const actualSkills = actualValue.map(s => s.skill);
                const hasChanged = !_.isEqual(actualSkills, originalValue);
                if (hasChanged) {
                    console.log(`Field ${key} has changed`, actualSkills, originalValue);
                }
                return hasChanged;
            } else if (key === 'stories') {
                const actualStories = actualValue.map(story => {
                    const formattedStory = cloneDeep(story);
                    formattedStory.fromDate = moment(story.fromDate).format(DATE_TO_SAVE_FORMAT);
                    if (story.toDate) formattedStory.toDate = moment(story.toDate).format(DATE_TO_SAVE_FORMAT);
                    delete formattedStory.connectedProject;
                    delete formattedStory.connectedExperience;
                    delete formattedStory.connectedEducation;
                    delete formattedStory.tmpId;
                    delete formattedStory.tmpOrder;
                    return formattedStory;
                });

                // do not consider the stories that existed and now have been removed. Do it by removing from originalValue the stories that are not present in actualValue (by id):
                const originalStories = originalValue.filter(story => actualStories.find(s => s.id === story.id));

                const hasChanged = !_.isEqual(actualStories, originalStories);
                if (hasChanged) {
                    console.log(`Field ${key} has changed`, actualStories, originalStories);
                }
                return hasChanged;
            }

            let hasChanged;
            // Uncomment for debugging
            //console.log('key', key);
            //console.log('actualValue', actualValue);
            //console.log('originalValue', originalValue);
            if (!actualValue && !originalValue) {
                hasChanged = false;
            } else if (Array.isArray(actualValue) || typeof actualValue === 'object') {
                hasChanged = !_.isEqual(actualValue, originalValue);
            } else {
                hasChanged = actualValue !== originalValue;
            }

            if (hasChanged) {
                console.log(`Field ${key} has changed`, actualValue, originalValue);
            }

            return hasChanged;
        });
    }

    // If the user tries to leave the page with unsaved changes, ask for confirmation
    let blocker = useBlocker(hasUnsavedChanges);
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
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={dateLocale}>
                    <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >{!formTitle && !formField ? (isCreate ? `New ${EntityTypeEnum.getLabel(entitiesType, false, true)}` : `Edit ${EntityTypeEnum.getLabel(entitiesType, false, true)}`) : (formTitle ?? formField)}</Typography>
                    <Box className="w-full flex-auto mt-10" component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate>
                        <Grid container spacing={2} padding={2} component="section" id="main-info-section">

                            <Grid item xs={12} md={5} className='!flex !flex-col'>
                                <CoverImage
                                    coverImageUrl={coverImageUrl}
                                    setCoverImageUrl={setCoverImageUrl}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                {
                                    entitiesType === EntityTypeEnum.PROJECTS ? (
                                        <ProjectSpecificFields />
                                    ) : entitiesType === EntityTypeEnum.EXPERIENCES ? (
                                        <ExperienceSpecificFields />
                                    ) : entitiesType === EntityTypeEnum.EDUCATIONS ? (
                                        <EducationSpecificFields />
                                    ) : null
                                }
                            </Grid>

                        </Grid>

                        <Grid container spacing={2} padding={2} component="section" id="stories-section">

                            <ShowIf condition={!isAddingNewStory}>
                                <Grid item xs={12} md={5}>
                                    <CustomCard className='button-clicked-inner-shadow cursor-pointer' onClick={() => toggleStoriesMode(true)}>
                                        <CustomCardContent className='justify-center items-center'>
                                            <Add color='primary' className='!text-5xl' />
                                            <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4 text-center" >Add a new Story</Typography>
                                        </CustomCardContent>
                                    </CustomCard>
                                </Grid>

                                <Grid item xs={12} md={7}>
                                    <StoriesList
                                        entitiesType={entitiesType}
                                        handleEditStory={handleEditStory}
                                    />
                                </Grid>
                            </ShowIf>

                            <ShowIf condition={isAddingNewStory}>
                                <Grid item xs={12}>
                                    <CreateOrEditStory
                                        myForm={myForm}
                                        goBack={() => toggleStoriesMode(false)}
                                        isCreate={isCreate}
                                        existingStory={storyToEdit ?? null}
                                        isProject={entitiesType === EntityTypeEnum.PROJECTS}
                                        isExperience={entitiesType === EntityTypeEnum.EXPERIENCES}
                                        isEducation={entitiesType === EntityTypeEnum.EDUCATIONS}
                                    />
                                </Grid>
                            </ShowIf>

                        </Grid>

                        <Box className="w-full p-4" component="section" id="skills-section">
                            <ExpandableSection
                                defaultExpanded
                                mainTitle={t('user-profile.skills.main-title')}
                                secondaryTitle={t('user-profile.skills.secondary-title')}
                                badge={t('user-profile.skills.badge', { number: myForm.watch('skills')?.length ?? 0 })}
                                MainBody={<SkillsSearchSelect myForm={myForm} />}
                                SecondaryBody={<NewSkill afterCreationAction={addNewSkill} />}
                            />
                        </Box>
                    </Box>
                </LocalizationProvider>

                <Tooltip title={isAddingNewStory ? `Close the story editor before saving the ${EntityTypeEnum.getLabel(entitiesType, false, false)}` : (myForm.formState.isValid ? `Save the ${EntityTypeEnum.getLabel(entitiesType, false, false)}` : 'Fill all the required fields')} placement='top' arrow>
                    <span className='fixed bottom-6 right-6' style={{ zIndex: 9 }}>
                        <Fab color="primary" aria-label="save" onClick={myForm.handleSubmit(handleSubmit)} disabled={isAddingNewStory /* || !myForm.formState.isValid */}>
                            <Save className='text-white' />
                        </Fab>
                    </span>
                </Tooltip>

            </FormProvider>
        </>
    );
};

export default CreateOrEditEntity;