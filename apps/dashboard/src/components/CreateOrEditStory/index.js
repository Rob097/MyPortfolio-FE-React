import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import CustomDialog from '@/components/Custom/DialogComponents';
import { CustomDatePicker, CustomTextField } from '@/components/Custom/FormComponents';
import MuiEditor from '@/components/MuiEditor';
import { EducationQ } from '@/models/education.model';
import { EntitiesStatus } from "@/models/enums";
import { ExperienceQ } from '@/models/experience.model';
import { ProjectQ } from '@/models/project.model';
import { EducationService } from '@/services/education.service';
import { ExperienceService } from '@/services/experience.service';
import { ProjectService } from '@/services/project.service';
import { StoryService } from '@/services/story.service';
import { Add, ArrowBack, Delete, ExpandMore, School, Widgets, Work } from '@mui/icons-material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Autocomplete, Box, Button, CardActions, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, Switch, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { debounce } from '@mui/material/utils';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { Criteria, Operation, View } from "shared/utilities/criteria";
import { displayMessages } from '../alerts';

const fieldMapping = {
    isProject: 'connectedProject',
    isExperience: 'connectedExperience',
    isEducation: 'connectedEducation',
};

const CreateOrEditStory = (props) => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation('dashboard');

    const [existingStory, setExistingStory] = useState(props.existingStory);
    const [isPublished, setIsPublished] = useState(existingStory?.status === EntitiesStatus.PUBLISHED);
    const defaultValues = useMemo(() => {
        const commonValues = {
            tmpId: Math.random().toString(36).substring(7),
            title: existingStory?.title ?? null,
            fromDate: existingStory?.fromDate ? moment(existingStory.fromDate) : null,
            toDate: existingStory?.toDate ? moment(existingStory.toDate) : null,
            description: existingStory?.description ?? null,
            relevantSections: existingStory?.relevantSections ?? [],
            diaryId: existingStory?.diaryId ?? store.getMainDiary()?.id,
            status: existingStory?.status ?? EntitiesStatus.DRAFT
        };

        const allValues = { ...commonValues };
        return allValues;
    }, [existingStory, props.isProject, props.isEducation, props.isExperience]);

    const { register, getValues, setValue, watch, handleSubmit, control, formState: { isDirty, isValid, errors }, ...rest } = useForm({
        defaultValues: defaultValues
    });

    const storyTitle = watch('title');
    const formEducation = watch('connectedEducation');
    const formExperience = watch('connectedExperience');
    const formProject = watch('connectedProject');
    const relevantSections = watch('relevantSections');

    const [searchedEducations, setSearchedEducations] = useState([]);
    const [searchedExperiences, setSearchedExperiences] = useState([]);
    const [searchedProjects, setSearchedProjects] = useState([]);

    const [deleteRelevantSectionModalOpen, setDeleteRelevantSectionModalOpen] = useState(false);
    const [relevantSectionToDeleteIndex, setRelevantSectionToDeleteIndex] = useState(null);

    const [deleteStoryModalOpen, setDeleteStoryModalOpen] = useState(false);

    const entityTitle = props.myForm.watch('title');
    const entityField = props.myForm.watch('field');
    const entityName = useMemo(() => {
        if (props.isProject || props.isExperience) {
            return entityTitle;
        } else if (props.isEducation) {
            return entityField;
        }
    }, [entityTitle, entityField]);

    useEffect(() => {
        const fieldName = Object.keys(fieldMapping).find(key => props[key]);
        if (fieldName) {
            const valueKey = fieldName === 'isEducation' ? 'field' : 'title';
            const value = {
                [valueKey]: entityName || `The current ${fieldName.slice(2)}`
            };
            setValue(fieldMapping[fieldName], value);
        }
    }, [entityName]);

    useEffect(() => {
        setExistingStory(props.existingStory);
    }, [props.existingStory]);

    useEffect(() => {
        const newStatus = isPublished ? EntitiesStatus.PUBLISHED : EntitiesStatus.DRAFT;
        const shouldDirty = (existingStory && existingStory?.status !== newStatus) || (!existingStory && newStatus !== EntitiesStatus.DRAFT);

        setValue('status', newStatus, { shouldDirty: shouldDirty });
    }, [isPublished, existingStory]);

    useEffect(() => {
        fetchEducations();
        fetchExperiences();
        fetchProjects();
    }, []);

    /*
    In ogni caso, bisonga guardare se c'è un existingStory.
    Se c'è, allora facciamo il fetch del projectId, experienceId e educationId (se presenti)
    E aggiungiamo il risultato alle option e lo settiamo come valore per il campo "connectedProject", "connectedExperience" e "connectedEducation".
    */
    useEffect(() => {
        if (existingStory) {
            const projectId = existingStory.projectId;
            const experienceId = existingStory.experienceId;
            const educationId = existingStory.educationId;

            if (projectId) {
                ProjectService.getById(projectId).then((response) => {
                    const project = response.content;

                    const validOptions = props.isProject ? [project] : [...searchedProjects, project];
                    setSearchedProjects(validOptions);
                    setValue('connectedProject', project);
                }).catch((error) => {
                    console.error(error);
                });
            }

            if (experienceId) {
                ExperienceService.getById(experienceId).then((response) => {
                    const experience = response.content;

                    const validOptions = props.isExperience ? [experience] : [...searchedExperiences, experience];
                    setSearchedExperiences(validOptions);
                    setValue('connectedExperience', experience);
                }).catch((error) => {
                    console.error(error);
                });
            }

            if (educationId) {
                EducationService.getById(educationId).then((response) => {
                    const education = response.content;

                    const validOptions = props.isEducation ? [education] : [...searchedEducations, education];
                    setSearchedEducations(validOptions);
                    setValue('connectedEducation', education);
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
    }, [existingStory]);

    ///////////////////////
    // General functions //
    ///////////////////////

    async function fetchEducations(query) {
        if (props.isEducation) {
            return;
        }

        const educationField = new Criteria(EducationQ.field, Operation.equals, "*" + query?.replace(" ", "*") + "*");
        const userId = new Criteria(EducationQ.userId, Operation.equals, store.user.id);

        const criterias = [userId];
        if (query) {
            criterias.push(educationField);
        }
        const filters = new EducationQ(criterias, View.normal, 0, 5, null);
        EducationService.getByCriteria(filters).then((response) => {
            const educations = response?.content;
            setSearchedEducations(educations);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function fetchExperiences(query) {
        if (props.isExperience) {
            return;
        }

        const experienceField = new Criteria(ExperienceQ.title, Operation.equals, "*" + query?.replace(" ", "*") + "*");
        const userId = new Criteria(ExperienceQ.userId, Operation.equals, store.user.id);

        const criterias = [userId];
        if (query) {
            criterias.push(experienceField);
        }
        const filters = new ExperienceQ(criterias, View.normal, 0, 5, null);
        ExperienceService.getByCriteria(filters).then((response) => {
            const experiences = response?.content;
            setSearchedExperiences(experiences);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function fetchProjects(query) {
        if (props.isProject) {
            return;
        }

        const projectField = new Criteria(ProjectQ.title, Operation.equals, "*" + query?.replace(" ", "*") + "*");
        const userId = new Criteria(ProjectQ.userId, Operation.equals, store.user.id);

        const criterias = [userId];
        if (query) {
            criterias.push(projectField);
        }
        const filters = new ProjectQ(criterias, View.normal, 0, 5, null);
        ProjectService.getByCriteria(filters).then((response) => {
            const projects = response?.content;
            setSearchedProjects(projects);
        }).catch((error) => {
            console.error(error);
        });
    }

    function addNewRelevantSection() {
        const relevantSections = getValues('relevantSections');
        const id = Math.random().toString(36).substring(7);
        const newRelevantSection = {
            tmpId: id,
            title: `Relevant Section #${relevantSections?.length + 1 ?? 1}`,
            description: ''
        };
        relevantSections.push(newRelevantSection);
        setValue('relevantSections', relevantSections);
    }

    function handleDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(relevantSections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setValue('relevantSections', items);
    }

    // Function to open dialog to delete a relevant section
    const handleOpenDeleteRelevantSectionDialog = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        setRelevantSectionToDeleteIndex(index);
        setDeleteRelevantSectionModalOpen(true);
    };

    // Function to confirm deletion of a relevant section
    const handleDeleteRelevantSection = () => {
        const newSections = [...relevantSections];
        newSections.splice(relevantSectionToDeleteIndex, 1);
        setValue('relevantSections', newSections);
        setDeleteRelevantSectionModalOpen(false);
    };

    // Function to confirm deletion of the story
    const handleDeleteStory = () => {
        const removeStoryFromList = (id) => {
            // Read the list of stories
            const stories = props.myForm.getValues('stories') || [];

            // Remove the story from the list
            const storyIndex = stories.findIndex(s => s.tmpId === id);
            if (storyIndex !== -1) {
                stories.splice(storyIndex, 1);
            }

            // set the field "tmpOrder" of each story as the current index
            stories.forEach((story, index) => {
                story.tmpOrder = index;
            });

            // set the new list of stories
            props.myForm.setValue('stories', stories);
        }

        const closeAndGoBack = () => {
            setDeleteStoryModalOpen(false);
            props.goBack();
        }

        if (existingStory) {
            if (existingStory.id) {
                StoryService.delete(existingStory.id).then(() => {
                    displayMessages([{ text: 'Story deleted', level: 'info' }]);
                    removeStoryFromList(existingStory.tmpId);
                    closeAndGoBack();
                }).catch(console.error);
            } else {
                removeStoryFromList(existingStory.tmpId);
                closeAndGoBack();
            }
        } else {
            closeAndGoBack();
        }
    };


    ////////////////////
    // Save functions //
    ////////////////////

    function goBack() {
        handleSubmit(submit)().then(() => {
            if (isDirty && !isValid && !window.confirm('Are you sure you want to go back? You will lose all the changes you made.')) {
                return;
            }
            props.goBack();
        }).catch(error => {
            console.error('Error while going back', error);
        });
    }

    function save() {
        handleSubmit(submit)().then(() => {
            displayMessages([{ text: 'Story saved', level: 'info' }]);
        }).catch(error => {
            console.error('Error while saving story', error);
        });
    }

    function submit(data) {
        if (existingStory) {
            const stories = props.myForm.getValues('stories');
            const index = existingStory.id ? stories.findIndex(s => s.id === existingStory.id) : stories.findIndex(s => s.tmpId === existingStory.tmpId);

            // Replace only the fields that have been changed
            stories[index] = { ...stories[index], ...data };

            props.myForm.setValue('stories', stories);
            console.log('Story updated', stories[index]);
        } else {
            const stories = props.myForm.getValues('stories') || [];

            // add the new story to the list as the first element
            stories.unshift(data);

            // set the field "tmpOrder" of each story as the current index
            stories.forEach((story, index) => {
                story.tmpOrder = index;
            });

            // set the new list of stories
            props.myForm.setValue('stories', stories);
            setExistingStory(data);
            console.log('Story added', data);
        }
    }

    return (
        <>
            <CustomCard className='w-full !shadow-xl'>
                <CustomCardHeader
                    className='!p-0'
                    fullheight="true"
                    title={
                        <Box className='w-full h-full flex justify-between items-center'>
                            <Box className="h-full flex flex-row items-center space-x-4">
                                <Box onClick={goBack} className="h-full bg-background-main hover:bg-primary-main/[.05] transition-colors flex flex-row flex-auto px-4 items-center space-x-2 cursor-pointer">
                                    <ArrowBack color='primary' fontSize='large' />
                                    <Typography variant='body2' color="dark.main" fontWeight={theme => theme.typography.fontWeightMedium}>{isDirty && isValid ? 'Save' : 'Back'}</Typography>
                                </Box>
                                <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} noWrap className="!text-2xl" >{storyTitle ? storyTitle : 'New Story'}</Typography>
                            </Box>
                            <Box className="h-full flex flex-row items-center space-x-4 px-4">
                                <FormControl component="fieldset">
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="start"
                                            control={
                                                <Switch
                                                    checked={isPublished}
                                                    onChange={(e) => {
                                                        e.persist();
                                                        setIsPublished(e.target.checked);
                                                    }}
                                                    color="primary"
                                                />
                                            }
                                            label="Published"
                                            labelPlacement="start"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <ShowIf condition={existingStory?.updatedAt !== undefined && existingStory?.updatedAt != null && existingStory?.updatedAt !== ''}>
                                    <Tooltip title="Last Update" placement='top' arrow>
                                        <Typography variant='body2' color="dark.main">{moment(existingStory?.updatedAt).format('DD/MM/YYYY')}</Typography>
                                    </Tooltip>
                                </ShowIf>
                            </Box>
                        </Box>
                    }
                />
                <CustomCardContent>

                    {/* Story main infos */}
                    <Grid container spacing={2} padding={2} component="section">
                        <Grid item xs={12} md={5}>
                            <Box className='w-full flex flex-col space-y-6'>
                                <CustomTextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    {...register('title', { required: 'Title is required' })}
                                    error={errors.title !== undefined}
                                    helperText={errors.title?.message}
                                />
                                <Controller
                                    control={control}
                                    name="fromDate"
                                    defaultValue={null}
                                    rules={{ required: t('From Date is required') }}
                                    render={({ field, fieldState: { error } }) => (
                                        <CustomDatePicker
                                            label={t('From Date')}
                                            value={field.value}
                                            inputRef={field.ref}
                                            onChange={(date) => {
                                                field.onChange(date);
                                            }}
                                            maxDate={watch('toDate') ?? moment()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="toDate"
                                    defaultValue={null}
                                    render={({ field, fieldState: { error } }) => (
                                        <CustomDatePicker
                                            label={t('To Date')}
                                            value={field.value}
                                            inputRef={field.ref}
                                            onChange={(date) => {
                                                field.onChange(date);
                                            }}
                                            minDate={watch('fromDate') ?? null}
                                            maxDate={moment()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box className='w-full flex flex-col space-y-6'>

                                <Autocomplete
                                    id={"connectedEducation"}
                                    options={searchedEducations}
                                    getOptionLabel={(option) => option?.field}
                                    onInputChange={debounce((e, value) => fetchEducations(value), 500)}
                                    renderInput={(params) => (
                                        <CustomTextField
                                            {...params}
                                            placeholder={formEducation ? null : "Connected Education"}
                                            label={formEducation ? "Connected Education" : null}
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <School />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={'li-' + option?.id}>
                                            {option?.field}
                                        </li>
                                    )}
                                    value={watch('connectedEducation') || null}
                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                    onChange={(e, value) => {
                                        setValue("connectedEducation", value);
                                        setValue("educationId", value?.id ?? null);
                                        if (!value?.id) {
                                            setValue("orderInEducation", null);
                                        }
                                    }}
                                    disabled={props.isEducation}
                                />

                                <Autocomplete
                                    id={"connectedExperience"}
                                    options={searchedExperiences}
                                    getOptionLabel={(option) => option?.title}
                                    onInputChange={debounce((e, value) => fetchExperiences(value), 500)}
                                    renderInput={(params) => (
                                        <CustomTextField
                                            {...params}
                                            placeholder={formExperience ? null : "Connected Experience"}
                                            label={formExperience ? "Connected Experience" : null}
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Work />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={'li-' + option?.id}>
                                            {option?.title}
                                        </li>
                                    )}
                                    value={watch('connectedExperience') || null}
                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                    onChange={(e, value) => {
                                        setValue("connectedExperience", value);
                                        setValue("experienceId", value?.id ?? null);
                                        if (!value?.id) {
                                            setValue("orderInExperience", null);
                                        }
                                    }}
                                    disabled={props.isExperience}
                                />

                                <Autocomplete
                                    id={"connectedProject"}
                                    options={searchedProjects}
                                    getOptionLabel={(option) => option?.title}
                                    onInputChange={debounce((e, value) => fetchProjects(value), 500)}
                                    renderInput={(params) => (
                                        <CustomTextField
                                            {...params}
                                            placeholder={formProject ? null : "Connected Project"}
                                            label={formProject ? "Connected Project" : null}
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Widgets />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={'li-' + option?.id}>
                                            {option?.title}
                                        </li>
                                    )}
                                    value={watch('connectedProject') || null}
                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                    onChange={(e, value) => {
                                        setValue("connectedProject", value);
                                        setValue("projectId", value?.id ?? null);
                                        if (!value?.id) {
                                            setValue("orderInProject", null);
                                        }
                                    }}
                                    disabled={props.isProject}
                                />

                            </Box>
                        </Grid>
                    </Grid>

                    {/* Description of the story */}
                    <Grid container spacing={2} padding={2} component="section">
                        <Grid item xs={12}>
                            <Box className='w-fit flex flex-row items-center justify-center'>
                                <Typography variant="h5" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom className='w-fit mr-2'>
                                    {t('Description')}
                                </Typography>
                            </Box>
                            <Controller
                                control={control}
                                name="description"
                                defaultValue={null}
                                rules={{ required: t('Description is required') }}
                                render={({ field, fieldState: { error } }) => (
                                    /* TODO: set useComplete to true when images are correctely managed */
                                    <MuiEditor useComplete={false} existingText={field?.value ?? ''} onChange={field.onChange} error={error} />
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* Relevant Sections  */}
                    <Grid container spacing={2} padding={2} component="section">
                        <Grid item xs={12}>
                            <Button className='!mb-4' variant='outlined' onClick={addNewRelevantSection} startIcon={<Add />}>
                                Add new Relevant section
                            </Button>

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="relevantSections">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4'>
                                            {relevantSections?.map((section, index) => {
                                                return (
                                                    <Draggable key={section.id ? String(section.id) : section.tmpId} draggableId={section.id ? String(section.id) : section.tmpId} index={index}>
                                                        {(provided) => {

                                                            /* Allow only vertical movements while dragging: */
                                                            var transform = provided.draggableProps.style.transform
                                                            if (transform) {
                                                                var t = transform.split(",")[1]
                                                                provided.draggableProps.style.transform = "translate(0px," + t
                                                            }

                                                            return (
                                                                <div {...provided.draggableProps} ref={provided.innerRef}>
                                                                    <Accordion
                                                                        sx={theme => ({
                                                                            border: `1px solid ${theme.palette.divider}`,
                                                                        })}
                                                                        id={section.title + '-accordion'}
                                                                    >
                                                                        <AccordionSummary
                                                                            expandIcon={<ExpandMore className='cursor-pointer' />}
                                                                            className='!cursor-default flex '
                                                                            sx={theme => ({
                                                                                borderBottom: `1px solid ${theme.palette.divider}`,
                                                                            })}
                                                                        >
                                                                            <Box className='w-full flex flex-row items-center justify-between'>
                                                                                <Box className='w-full flex flex-row items-center'>
                                                                                    <span {...provided.dragHandleProps} className='flex items-center'>
                                                                                        <DragHandleIcon color='primary' className='cursor-pointer' />
                                                                                    </span>
                                                                                    <Typography variant="h6" fontWeight={theme => theme.typography.fontWeightMedium} className='w-fit !mx-2'>
                                                                                        {section.title}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Delete color='error' className='cursor-pointer' fontSize='small' onClick={event => handleOpenDeleteRelevantSectionDialog(event, index)} />
                                                                            </Box>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails className='space-y-4 mt-4'>
                                                                            <CustomTextField
                                                                                label="Title"
                                                                                value={section.title}
                                                                                fullWidth
                                                                                onChange={(e) => {
                                                                                    const newSections = [...relevantSections];
                                                                                    newSections[index].title = e.target.value;
                                                                                    setValue('relevantSections', newSections);
                                                                                }}
                                                                            />
                                                                            {/* TODO: set useComplete to true when images are correctely managed */}
                                                                            <MuiEditor
                                                                                label="Description"
                                                                                existingText={section.description}
                                                                                fullWidth
                                                                                useComplete={false}
                                                                                onChange={(value) => {
                                                                                    const newSections = [...relevantSections];
                                                                                    newSections[index].description = value;
                                                                                    setValue('relevantSections', newSections);
                                                                                }}
                                                                            />
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Grid>
                    </Grid>

                </CustomCardContent>
                <CardActions className='!px-8 justify-center sm:justify-between'>
                    <Box className='space-x-4'>
                        <Button variant='outlined' color='primary' onClick={props.goBack}>
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' onClick={save} disabled={!isValid || !isDirty}>
                            Save
                        </Button>
                    </Box>
                    {existingStory && (
                        <Box>
                            <Button variant='contained' color='error' onClick={() => setDeleteStoryModalOpen(true)}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardActions>

            </CustomCard>

            <CustomDialog
                isOpen={deleteStoryModalOpen}
                title="Delete Story"
                text={<>Are you sure you want to delete the story <b>{storyTitle}</b>?<br /><br /><b>ATTENTION</b>: The Story will be removed from the project, experience and education it is connected to.<br /><br /><b>This action cannot be undone.</b></>}
                onCancel={() => setDeleteStoryModalOpen(false)}
                onDelete={handleDeleteStory}
            />

            <CustomDialog
                isOpen={deleteRelevantSectionModalOpen}
                title="Delete Section"
                text={<>Are you sure you want to delete the section <b>{relevantSections[relevantSectionToDeleteIndex]?.title}</b>?<br />This action cannot be undone.</>}
                onCancel={() => setDeleteRelevantSectionModalOpen(false)}
                onDelete={handleDeleteRelevantSection}
            />

        </>
    )
}

export default CreateOrEditStory;