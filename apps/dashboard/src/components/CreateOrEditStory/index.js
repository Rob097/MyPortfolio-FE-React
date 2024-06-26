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
import { DATE_TO_DISPLAY_FORMAT_EN, DATE_TO_DISPLAY_FORMAT_IT } from '@/utilities';
import { Add, ArrowBack, Delete, ExpandMore, School, Widgets, Work } from '@mui/icons-material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Autocomplete, Box, Button, CardActions, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, Switch, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { debounce } from '@mui/material/utils';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
    const { t, i18n } = useTranslation('dashboard');

    const dateFormat = useMemo(() => i18n.language === 'it' ? DATE_TO_DISPLAY_FORMAT_IT : DATE_TO_DISPLAY_FORMAT_EN, [i18n.language]);

    const [existingStory, setExistingStory] = useState(props.existingStory);
    const [isPublished, setIsPublished] = useState(existingStory?.status === EntitiesStatus.PUBLISHED);

    const defaultValues = useMemo(() => ({
        tmpId: Math.random().toString(36).substring(7),
        title: existingStory?.title ?? '',
        fromDate: existingStory?.fromDate ? moment(existingStory.fromDate) : null,
        toDate: existingStory?.toDate ? moment(existingStory.toDate) : null,
        description: existingStory?.description ?? '',
        relevantSections: existingStory?.relevantSections ?? [],
        diaryId: existingStory?.diaryId ?? store?.getMainDiary()?.id,
        status: existingStory?.status ?? EntitiesStatus.DRAFT,
    }), [existingStory]);

    const { register, getValues, setValue, watch, handleSubmit, control, formState: { isDirty, isValid, errors }, ...rest } = useForm({
        defaultValues: defaultValues
    });

    const storyTitle = watch('title');
    const formEducation = watch('connectedEducation');
    const formExperience = watch('connectedExperience');
    const formProject = watch('connectedProject');
    const { fields: relevantSections, append, move, remove } = useFieldArray({
        control,
        name: "relevantSections"
    });

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
                [valueKey]: entityName || t(`entities.edit.edit-story.current-entity`, { entity: t(`labels.${fieldName.slice(2).toLowerCase()}`) })
            };
            setValue(fieldMapping[fieldName], value);
        }
    }, [entityName]);

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

    const fetchEducations = useCallback(debounce(async (query) => {
        if (props.isEducation) return;
        const educationField = new Criteria(EducationQ.field, Operation.equals, `*${query?.replace(' ', '*')}*`);
        const userId = new Criteria(EducationQ.userId, Operation.equals, store.user.id);
        const filters = new EducationQ([userId, query && educationField].filter(Boolean), View.normal, 0, 5, null);
        try {
            const response = await EducationService.getByCriteria(filters);
            setSearchedEducations(response?.content);
        } catch (error) {
            console.error(error);
        }
    }, 500), []);

    const fetchExperiences = useCallback(debounce(async (query) => {
        if (props.isExperience) return;
        const experienceField = new Criteria(ExperienceQ.title, Operation.equals, `*${query?.replace(' ', '*')}*`);
        const userId = new Criteria(ExperienceQ.userId, Operation.equals, store.user.id);
        const filters = new ExperienceQ([userId, query && experienceField].filter(Boolean), View.normal, 0, 5, null);
        try {
            const response = await ExperienceService.getByCriteria(filters);
            setSearchedExperiences(response?.content);
        } catch (error) {
            console.error(error);
        }
    }, 500), []);

    const fetchProjects = useCallback(debounce(async (query) => {
        if (props.isProject) return;
        const projectField = new Criteria(ProjectQ.title, Operation.equals, `*${query?.replace(' ', '*')}*`);
        const userId = new Criteria(ProjectQ.userId, Operation.equals, store.user.id);
        const filters = new ProjectQ([userId, query && projectField].filter(Boolean), View.normal, 0, 5, null);
        try {
            const response = await ProjectService.getByCriteria(filters);
            setSearchedProjects(response?.content);
        } catch (error) {
            console.error(error);
        }
    }, 500), []);

    function addNewRelevantSection() {
        const id = Math.random().toString(36).substring(7);
        const newRelevantSection = {
            tmpId: id,
            title: `${t('labels.relevant-section')} #${relevantSections?.length + 1 ?? 1}`,
            description: ''
        };
        append(newRelevantSection);
    }

    const handleDragEnd = useCallback((result) => {
        if (!result.destination) return;

        move(result.source.index, result.destination.index);
    }, [relevantSections]);

    const handleOpenDeleteRelevantSectionDialog = useCallback((event, index) => {
        event.stopPropagation();
        event.preventDefault();
        setRelevantSectionToDeleteIndex(index);
        setDeleteRelevantSectionModalOpen(true);
    }, []);

    // Function to confirm deletion of a relevant section
    const handleDeleteRelevantSection = () => {
        remove(relevantSectionToDeleteIndex);
        setDeleteRelevantSectionModalOpen(false);
    };

    // Function to confirm deletion of the story
    const handleDeleteStory = () => {
        const removeStoryFromList = (id) => {
            console.log('Removing story with id', id);
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
                    displayMessages([{ text: t('services.story.delete.ok'), level: 'success' }]);
                    removeStoryFromList(existingStory.tmpId);
                    closeAndGoBack();
                }).catch((error) => {
                    displayMessages([{ text: t('services.story.delete.ko'), level: 'error' }]);
                    console.error('Error while deleting story', error);
                });
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

    const goBack = useCallback(() => {
        handleSubmit(submit)().then(() => {
            if (isDirty && !isValid && !window.confirm(t('entities.edit.edit-story.go-back-check'))) {
                return;
            }
            props.goBack();
        }).catch((error) => {
            console.error(t('entities.edit.edit-story.go-back-error'), error);
        });
    }, [handleSubmit, isDirty, isValid, props]);

    function save() {
        handleSubmit(submit)().then(() => {
            displayMessages([{ text: t('services.story.save.ok'), level: 'info' }]);
        }).catch(error => {
            displayMessages([{ text: t('services.story.save.ko'), level: 'error' }]);
            console.error('Error while saving story', error);
        });
    }

    function submit(data) {

        if (data && data.relevantSections) {
            // remove the field "id" from each relevantSection if it's not a number:
            data.relevantSections.forEach((section) => {
                if (section.id && isNaN(section.id)) {
                    delete section.id;
                }
            });
        }

        if (existingStory) {
            const stories = props.myForm.getValues('stories');
            const index = existingStory.id ? stories.findIndex(s => s.id === existingStory.id) : stories.findIndex(s => s.tmpId === existingStory.tmpId);

            // Replace only the fields that have been changed
            stories[index] = { ...stories[index], ...data };

            props.myForm.setValue('stories', stories);
            console.log(t('services.story.update.ok'), stories[index]);
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
            console.log('services.story.create.ok', data);
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
                                    <Typography variant='body2' color="dark.main" fontWeight={theme => theme.typography.fontWeightMedium}>{isDirty && isValid ? t('labels.save') : t('labels.back')}</Typography>
                                </Box>
                                <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} noWrap className="!text-2xl" >{storyTitle ? storyTitle : t('labels.new-story')}</Typography>
                            </Box>
                            <Box className="h-full flex flex-row items-center space-x-4 px-4">
                                <FormControl component="fieldset">
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="start"
                                            defaultChecked={isPublished}
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
                                            label={t('labels.status.published')}
                                            labelPlacement="start"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <ShowIf condition={existingStory?.updatedAt !== undefined && existingStory?.updatedAt != null && existingStory?.updatedAt !== ''}>
                                    <Tooltip title={t('labels.last-update')} placement='top' arrow>
                                        <Typography variant='body2' color="dark.main">{moment(existingStory?.updatedAt).format(dateFormat)}</Typography>
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
                                <Controller
                                    control={control}
                                    name="title"
                                    rules={{ required: t('entities.edit.edit-story.fields.title.required') }}
                                    render={({ field }) => (
                                        <CustomTextField
                                            label={t('entities.edit.edit-story.fields.title.label')}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="fromDate"
                                    defaultValue={null}
                                    rules={{ required: t('entities.edit.edit-story.fields.from-date.required') }}
                                    render={({ field, fieldState: { error } }) => (
                                        <CustomDatePicker
                                            label={t('entities.edit.edit-story.fields.from-date.label')}
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
                                            label={t('entities.edit.edit-story.fields.to-date.label')}
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
                                            placeholder={formEducation ? null : t('entities.edit.edit-story.fields.connectedEducation')}
                                            label={formEducation ? t('entities.edit.edit-story.fields.connectedEducation') : null}
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
                                        setValue("connectedEducation", value, { shouldDirty: true });
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
                                            placeholder={formExperience ? null : t('entities.edit.edit-story.fields.connectedExperience')}
                                            label={formExperience ? t('entities.edit.edit-story.fields.connectedExperience') : null}
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
                                        setValue("connectedExperience", value, { shouldDirty: true });
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
                                            placeholder={formProject ? null : t('entities.edit.edit-story.fields.connectedProject')}
                                            label={formProject ? t('entities.edit.edit-story.fields.connectedProject') : null}
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
                                        setValue("connectedProject", value, { shouldDirty: true });
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
                                    {t('entities.edit.edit-story.fields.description.label')}
                                </Typography>
                            </Box>
                            <Controller
                                control={control}
                                name="description"
                                defaultValue={defaultValues.description}
                                rules={{ required: t('entities.edit.edit-story.fields.description.required') }}
                                render={({ field, fieldState: { error } }) => (
                                    <MuiEditor
                                        useComplete={true}
                                        existingText={field?.value ?? ''}
                                        onChange={field.onChange}
                                        error={error}
                                        showFooter={true}
                                        showAIButton={true}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* Relevant Sections  */}
                    <Grid container spacing={2} padding={2} component="section">
                        <Grid item xs={12}>
                            <Button className='!mb-4' variant='outlined' onClick={addNewRelevantSection} startIcon={<Add />}>
                                {t('entities.edit.edit-story.relevant-sections.add')}
                            </Button>

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="relevantSections">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4'>
                                            {relevantSections?.map((section, index) => {
                                                return (
                                                    <Draggable key={section.id} draggableId={section.id} index={index}>
                                                        {(provided) => {

                                                            /* Allow only vertical movements while dragging: */
                                                            var transform = provided.draggableProps.style.transform
                                                            if (transform) {
                                                                var t1 = transform.split(",")[1]
                                                                provided.draggableProps.style.transform = "translate(0px," + t1
                                                            }

                                                            const isTitleError = errors?.relevantSections?.[index]?.title;
                                                            const isDescriptionError = errors?.relevantSections?.[index]?.description;
                                                            const [sectionTitle, setSectionTitle] = useState(section.title);

                                                            return (
                                                                <div {...provided.draggableProps} ref={provided.innerRef}>
                                                                    <Accordion
                                                                        sx={theme => ({
                                                                            border: `1px solid ${theme.palette.divider}`,
                                                                        })}
                                                                        id={section.title + '-accordion'}
                                                                        className={isTitleError || isDescriptionError ? '!border-red-700' : ''}
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
                                                                                        {sectionTitle}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Delete color='error' className='cursor-pointer' fontSize='small' onClick={event => handleOpenDeleteRelevantSectionDialog(event, index)} />
                                                                            </Box>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails className='space-y-4 mt-4'>
                                                                            <Controller
                                                                                control={control}
                                                                                name={`relevantSections[${index}].title`}
                                                                                rules={{ required: t('entities.edit.edit-story.relevant-sections.fields.title.required') }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <CustomTextField
                                                                                        {...field}
                                                                                        label={t('entities.edit.edit-story.relevant-sections.fields.title.label')}
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        error={!!error}
                                                                                        helperText={error?.message}
                                                                                        value={field.value}
                                                                                        onChange={(e) => {
                                                                                            setSectionTitle(e.target.value);
                                                                                            field.onChange(e);
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                control={control}
                                                                                name={`relevantSections[${index}].description`}
                                                                                rules={{ required: t('entities.edit.edit-story.relevant-sections.fields.description.required') }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <MuiEditor
                                                                                        useComplete={true}
                                                                                        existingText={field?.value ?? ''}
                                                                                        onChange={field.onChange}
                                                                                        error={error}
                                                                                        showFooter={true}
                                                                                        showAIButton={true}
                                                                                    />
                                                                                )}
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
                        <Button variant='outlined' color='primary' onClick={props.goBack} startIcon={<ArrowBack />}>
                            {t('labels.cancel')}
                        </Button>
                        {/*<Button variant='contained' color='primary' onClick={save} disabled={!isValid || !isDirty} startIcon={<Save />}>
                            {t('labels.save')}
                        </Button>*/}
                    </Box>
                    {existingStory && (
                        <Box>
                            <Button variant='contained' color='error' onClick={() => setDeleteStoryModalOpen(true)} startIcon={<Delete />}>
                                {t('labels.delete')}
                            </Button>
                        </Box>
                    )}
                </CardActions>

            </CustomCard>

            <CustomDialog
                isOpen={deleteStoryModalOpen}
                title={t('entities.edit.edit-story.delete-dialog.title')}
                isHtml={true}
                text={t('entities.edit.edit-story.delete-dialog.text', { title: storyTitle })}
                onCancel={() => setDeleteStoryModalOpen(false)}
                onDelete={handleDeleteStory}
            />

            <CustomDialog
                isOpen={deleteRelevantSectionModalOpen}
                title={t('entities.edit.edit-story.relevant-sections.delete-dialog.title')}
                isHtml={true}
                text={t('entities.edit.edit-story.relevant-sections.delete-dialog.text', { title: relevantSections[relevantSectionToDeleteIndex]?.title })}
                onCancel={() => setDeleteRelevantSectionModalOpen(false)}
                onDelete={handleDeleteRelevantSection}
            />

        </>
    )
}

export default CreateOrEditStory;