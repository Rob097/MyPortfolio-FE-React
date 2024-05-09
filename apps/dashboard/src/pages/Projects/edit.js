import CreateOrEditStory from '@/components/CreateOrEditStory';
import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import { CustomDatePicker, CustomTextArea, CustomTextField } from '@/components/Custom/FormComponents';
import CustomFileInput from '@/components/CustomFileInput';
import ExpandableSection from '@/components/ExpandableSection';
import useExtensions from "@/components/MuiEditor/useExtensions";
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { EntitiesStatus } from "@/models/enums";
import { Project } from '@/models/project.model';
import { ProjectService } from '@/services/project.service';
import { Add, ChevronLeft, ChevronRight, Close, Delete, Edit, Image, Receipt, Save } from '@mui/icons-material';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import { Box, Button, CardActions, Divider, FormControl, FormControlLabel, FormGroup, Grid, Switch, Tooltip, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { RichTextReadOnly } from "mui-tiptap";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate, useParams } from 'react-router-dom';
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { MAX_FILE_SIZE } from "shared/utilities/constants";
import { View } from "shared/utilities/criteria";

const ONE_MB = 1024 * 1024;
const defaultValues = {
    status: EntitiesStatus.DRAFT,
    title: '',
    fromDate: null,
    toDate: null,
    description: '',
    stories: [],
    skills: [],
    coverImage: '',
};
const dateToSaveFormat = 'YYYY-MM-DD';

const EditProject = () => {
    const [store, dispatch] = useDashboardStore();
    const navigate = useNavigate();
    const { t } = useTranslation("dashboard");
    const { slug: projectSlug } = useParams();
    const extensions = useExtensions();

    if (!projectSlug) {
        displayMessages([{ text: 'Project ID is required', level: 'error' }]);
        navigate('/dashboard/projects');
    }
    const isCreate = useMemo(() => projectSlug === 'new', [projectSlug]);
    const [originalProject, setOriginalProject] = useState(null);

    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [storyToEdit, setStoryToEdit] = useState(null);
    const [isAddingNewStory, setIsAddingNewStory] = useState(false);
    const [deleteStoryModalOpen, setDeleteStoryModalOpen] = useState(false);
    const [storyToDeleteIndex, setStoryToDeleteIndex] = useState(null);

    // Fetch the project if it's not a new one
    useEffect(() => {
        if (!isCreate) {
            fetchProject();
        }
    }, [projectSlug, isCreate]);

    // Form elements
    const myForm = useForm({
        defaultValues: defaultValues,
    });
    const { field: coverImage } = useController({
        control: myForm.control,
        name: 'coverImage'
    });
    const formTitle = myForm.watch('title');
    const stories = myForm.watch('stories');


    // Form functions -- BEGIN
    function handleSubmit(data) {
        const { coverImage, stories, skills, published, title, description, fromDate, toDate, status } = data;
        const formattedSkills = skills?.map(s => s.skill);

        const formattedStories = stories?.map(story => {
            const formattedStory = {
                ...story,
                fromDate: moment(story.fromDate).format(dateToSaveFormat),
                toDate: story.toDate ? moment(story.toDate).format(dateToSaveFormat) : null,
                projectId: !isCreate ? originalProject.id : story.projectId,
            };
            delete formattedStory.connectedProject;
            delete formattedStory.tmpId;
            return formattedStory;
        });

        let project = {
            userId: store.user.id,
            published,
            title,
            description,
            fromDate: moment(fromDate).format(dateToSaveFormat),
            toDate: toDate ? moment(toDate).format(dateToSaveFormat) : null,
            status,
            stories: formattedStories,
            skills: formattedSkills,
        };

        if (!isCreate && originalProject) {
            project = { ...originalProject, ...project };
        }

        const projectPromise = isCreate ? ProjectService.create(project) : ProjectService.update(project);
        const successMessage = isCreate ? 'Project created successfully' : 'Project updated successfully';
        const errorMessage = isCreate ? 'Error while creating the project' : 'Error while updating the project';

        trackPromise(
            projectPromise.then((response) => {
                displayMessages([{ text: successMessage, level: 'success' }]);

                if (coverImage && coverImage !== originalProject?.coverImage) {
                    return trackPromise(
                        ProjectService.uploadCoverImage(response.content.id, coverImage).then(() => {
                            displayMessages([{ text: 'Cover image uploaded successfully', level: 'success' }]);
                            fetchProject();
                        })
                    );
                } else if (originalProject?.coverImage && !coverImage) {
                    return trackPromise(
                        ProjectService.removeCoverImage(response.content.id).then(() => {
                            displayMessages([{ text: 'Cover image removed successfully', level: 'success' }]);
                            fetchProject();
                        })
                    );
                } else {
                    fetchProject();
                }

            }).catch((error) => {
                displayMessages([{ text: errorMessage, level: 'error' }]);
                console.error(error);
            })
        );
    }

    function fetchProject() {
        trackPromise(
            ProjectService.getBySlug(projectSlug, View.verbose).then((response) => {
                const project = new Project(response.content);
                if (project) {
                    const stories = project.stories.sort((a, b) => a.orderInProject - b.orderInProject);
                    const skills = project.skills?.map(s => ({ skill: s }));
                    const coverImage = project.coverImage;
                    const values = {
                        published: project.published,
                        title: project.title,
                        fromDate: moment(project.fromDate),
                        toDate: project.toDate ? moment(project.toDate) : null,
                        description: project.description,
                        stories: stories,
                        skills: skills,
                        coverImage: coverImage,
                        status: project.status
                    };
                    myForm.reset(values);
                    setOriginalProject(project);
                    setCoverImageUrl(coverImage);
                }
            }).catch((error) => {
                displayMessages([{ text: 'Error while fetching the project', level: 'error' }]);
                console.error(error);
            })
        );
    }

    function handleReplaceCoverImage(file) {
        myForm.setValue('coverImage', file);
        if (file) {
            setCoverImageUrl(URL.createObjectURL(file));
        } else {
            setCoverImageUrl(null);
        }
    }

    function handleChooseCoverImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.maxFiles = 1;
        input.maxSize = MAX_FILE_SIZE;
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file && file.size <= MAX_FILE_SIZE) {
                handleReplaceCoverImage(file);
            } else {
                displayMessages([{ text: t('files.errors.too-large', { fileName: file?.name, maxSize: MAX_FILE_SIZE / ONE_MB }), level: 'error' }]);
            }
        };
        input.click();
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

    const handleOpenDeleteStoryDialog = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        setStoryToDeleteIndex(index);
        setDeleteStoryModalOpen(true);
    }

    const handleDeleteStory = () => {
        const stories = myForm.getValues('stories');
        stories.splice(storyToDeleteIndex, 1);
        myForm.setValue('stories', stories);
        setDeleteStoryModalOpen(false);
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

    const swapStories = (index, direction) => {
        let newStories = [...stories];
        if (direction === 'left' && index > 0) {
            [newStories[index].orderInProject, newStories[index - 1].orderInProject] = [newStories[index - 1].orderInProject, newStories[index].orderInProject];
        } else if (direction === 'right' && index < newStories.length - 1) {
            [newStories[index].orderInProject, newStories[index + 1].orderInProject] = [newStories[index + 1].orderInProject, newStories[index].orderInProject];
        }
        myForm.setValue('stories', newStories);
    };

    function handleEditStory(story) {
        setStoryToEdit(story);
        setIsAddingNewStory(true);
    }

    // Generic functions -- END

    // Stories Card styles -- BEGIN
    const minWidth = 250;
    const maxWidth = 350;
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const storiesPerPage = Math.floor(parentWidth / Math.max(minWidth, Math.min(maxWidth, parentWidth)));

    useEffect(() => {
        const updateParentWidth = () => {
            if (parentRef.current) {
                setParentWidth(parentRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', updateParentWidth);
        updateParentWidth();

        return () => {
            window.removeEventListener('resize', updateParentWidth);
        };
    }, []);

    // Stories Card styles -- END

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >{!formTitle ? (isCreate ? 'New Project' : 'Edit Project') : formTitle}</Typography>
                <Box className="w-full flex-auto mt-10 bg-white rounded-md" component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate>
                    <Grid container spacing={2} padding={2} component="section" id="main-info-section">

                        <Grid item xs={12} md={5} className='!flex !flex-col'>
                            <CustomCard>
                                <CustomCardHeader
                                    title="Cover Photo"
                                    avatar={
                                        <Image color='primary' fontSize='large' />
                                    }
                                />
                                <CustomCardContent>
                                    {coverImageUrl ?
                                        <Box className='w-full relative h-48 xl:h-80 rounded-md shadow-md bg-no-repeat bg-cover bg-center' sx={{ backgroundImage: `url(${coverImageUrl})` }}>
                                            <Box className='absolute -top-6 -right-4 flex flex-col items-center space-y-2'>
                                                <Box className='p-1 bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-primary-50 transition-colors' onClick={() => handleReplaceCoverImage(null)}>
                                                    <Close color='error' width='32' height='32' className='font-bold !text-3xl' />
                                                </Box>
                                                <Box className='p-1 bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-primary-50 transition-colors' onClick={handleChooseCoverImage}>
                                                    <Edit color='inherit' width='32' height='32' className='font-bold !text-3xl' />
                                                </Box>
                                            </Box>
                                        </Box>
                                        :
                                        <Box className='w-full flex-grow mt-4'>
                                            <CustomFileInput
                                                field={coverImage}
                                                replaceFile={handleReplaceCoverImage}
                                                removeFile={handleReplaceCoverImage}
                                                rootClassName='w-full'
                                                onlyImages
                                            />
                                        </Box>
                                    }
                                </CustomCardContent>
                            </CustomCard>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <CustomCard>
                                <CustomCardHeader
                                    title={
                                        <Box className='w-full flex justify-between items-center'>
                                            General Informations
                                            <FormControl component="fieldset">
                                                <FormGroup aria-label="position" row>
                                                    <FormControlLabel
                                                        value="start"
                                                        control={
                                                            <Controller
                                                                name="status"
                                                                control={myForm.control}
                                                                render={({ field }) => (
                                                                    <Switch
                                                                        {...field}
                                                                        checked={field.value === EntitiesStatus.PUBLISHED}
                                                                        onChange={(e) => field.onChange(e.target.checked ? EntitiesStatus.PUBLISHED : EntitiesStatus.DRAFT)}
                                                                        color="primary"
                                                                    />
                                                                )}
                                                            />
                                                        }
                                                        label="Published"
                                                        labelPlacement="start"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Box>
                                    }
                                    avatar={
                                        <Receipt color='primary' fontSize='large' />
                                    }
                                />
                                <CustomCardContent>

                                    <Grid container spacing={2} padding={2}>
                                        <Grid item xs={12}>
                                            <Controller
                                                control={myForm.control}
                                                name="title"
                                                rules={{ required: t('Title is required') }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <CustomTextField
                                                        label={t('Title')}
                                                        variant="outlined"
                                                        fullWidth
                                                        error={error}
                                                        helperText={error?.message}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        value={field.value}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Controller
                                                control={myForm.control}
                                                name="fromDate"
                                                rules={{ required: t('From Date is required') }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <CustomDatePicker
                                                        label={t('From Date')}
                                                        value={field.value}
                                                        inputRef={field.ref}
                                                        onChange={(date) => {
                                                            field.onChange(date);
                                                        }}
                                                        maxDate={myForm.watch('toDate') ?? moment()}
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
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Controller
                                                control={myForm.control}
                                                name="toDate"
                                                render={({ field, fieldState: { error } }) => (
                                                    <CustomDatePicker
                                                        label={t('To Date')}
                                                        value={field.value}
                                                        inputRef={field.ref}
                                                        onChange={(date) => {
                                                            field.onChange(date);
                                                        }}
                                                        minDate={myForm.watch('fromDate') ?? null}
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Controller
                                                control={myForm.control}
                                                name="description"
                                                rules={{ required: t('Description is required') }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <CustomTextArea
                                                        label={t('Description')}
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        value={field.value}
                                                        error={error}
                                                        helperText={error?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </CustomCardContent>
                            </CustomCard>
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} padding={2} component="section" id="stories-section">

                        <ShowIf condition={!isAddingNewStory}>
                            <Grid item xs={12} md={5}>
                                <CustomCard className='hover:!shadow-lg cursor-pointer' onClick={() => toggleStoriesMode(true)}>
                                    <CustomCardContent className='justify-center items-center'>
                                        <Add color='primary' className='!text-5xl' />
                                        <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4 text-center" >Add a new Story</Typography>
                                    </CustomCardContent>
                                </CustomCard>
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <CustomCard>
                                    <CustomCardContent ref={parentRef} id="stories-content-container" className={stories?.length == 0 ? 'justify-center items-center' : 'justify-start items-start'}>
                                        {stories?.length == 0 ? (
                                            <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl text-center">
                                                This project doesn't have<br />any story, yet...
                                            </Typography>
                                        ) :
                                            <>
                                                <Box className='w-full flex flex-row space-x-4'>
                                                    {stories.sort((a, b) => a.orderInProject - b.orderInProject).slice((currentPage - 1) * storiesPerPage, currentPage * storiesPerPage).map((story, index) => (
                                                        <Box key={story.id ?? story.tmpId} className='w-full' sx={{ maxWidth: '350px', minWidth: '250px' }}>
                                                            <CustomCard id={story.id}>
                                                                <CustomCardHeader
                                                                    title={story.title}
                                                                    // Show the dates (which are moment object) formatted as MM/DD/YYYY
                                                                    subheader={<Typography variant="body2" color="primary">{moment(story.fromDate).format('MM/DD/YYYY')} - {story.toDate ? moment(story.toDate).format('MM/DD/YYYY') : 'Present'}</Typography>}
                                                                />
                                                                <CustomCardContent adaptheight="true">
                                                                    <Box className='w-full h-40' sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", }}>
                                                                        <RichTextReadOnly
                                                                            content={story.description?.replace(/<[^>]*>?/gm, '') ?? ''}
                                                                            extensions={extensions}

                                                                        />
                                                                    </Box>
                                                                    <Divider className='!my-4' />
                                                                    <Box className='w-full flex flex-col space-y-4'>
                                                                        <Box className='w-full flex flex-row items-center justify-between'>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>Status</Typography>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>
                                                                                <Tooltip title={story.status ? story.status.charAt(0).toUpperCase() + story.status.slice(1).toLowerCase() : EntitiesStatus.DRAFT.charAt(0).toUpperCase() + EntitiesStatus.DRAFT.slice(1).toLowerCase()} placement='top' arrow>
                                                                                    <TripOriginRoundedIcon color={story.status === EntitiesStatus.PUBLISHED ? 'success' : 'error'} />
                                                                                </Tooltip>
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box className='w-full flex flex-row items-center justify-between'>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>Relevant Sections</Typography>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>{story.relevantSections?.length ?? 0}</Typography>
                                                                        </Box>
                                                                        <Box className='w-full flex flex-row items-center justify-between'>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>Skills</Typography>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>{story.skills?.length ?? 0}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </CustomCardContent>
                                                                <CardActions className='flex flex-row justify-between !px-4'>
                                                                    <Box className='flex flex-row space-x-2'>
                                                                        <Tooltip title="Edit" placement='top' arrow>
                                                                            <Button variant='text' className='!w-fit !min-w-fit' classes={{ startIcon: '!m-0' }} onClick={() => handleEditStory(story)} startIcon={
                                                                                <Edit color='primary' fontSize='medium' />
                                                                            } />
                                                                        </Tooltip>
                                                                        <Tooltip title="Delete" placement='top' arrow>
                                                                            <Button variant='text' color='error' className='!w-fit !min-w-fit' classes={{ startIcon: '!m-0' }} onClick={(e) => handleOpenDeleteStoryDialog(e, index)} startIcon={
                                                                                <Delete color='error' fontSize='medium' />
                                                                            } />
                                                                        </Tooltip>
                                                                    </Box>
                                                                    <Box className='flex flex-row space-x-2'>
                                                                        <Tooltip title="Move Back" placement='top' arrow>
                                                                            <ChevronLeft color='primary' fontSize='medium' onClick={() => swapStories(index, 'left')} className={index === 0 ? 'cursor-not-allowed !text-gray-300' : 'cursor-pointer'} />
                                                                        </Tooltip>
                                                                        <Tooltip title="Move Forward" placement='top' arrow>
                                                                            <ChevronRight color='primary' fontSize='medium' onClick={() => swapStories(index, 'right')} className={index === stories.length - 1 ? 'cursor-not-allowed !text-gray-300' : 'cursor-pointer'} />
                                                                        </Tooltip>
                                                                    </Box>
                                                                </CardActions>
                                                            </CustomCard>
                                                        </Box>
                                                    ))}
                                                </Box>
                                                <Pagination count={Math.ceil(stories.length / storiesPerPage)} className='mx-auto my-4' page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
                                            </>
                                        }
                                    </CustomCardContent>
                                </CustomCard>
                            </Grid>
                        </ShowIf>

                        <ShowIf condition={isAddingNewStory}>
                            <Grid item xs={12}>
                                <CreateOrEditStory myForm={myForm} goBack={() => toggleStoriesMode(false)} isCreate={isCreate} existingStory={storyToEdit ?? null} isProject />
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

            <Tooltip title={isAddingNewStory ? 'Save the story before saving the project' : (myForm.formState.isValid ? 'Save the project' : 'Fill all the required fields')} placement='top' arrow>
                <span className='fixed bottom-6 right-6' style={{ zIndex: 9 }}>
                    <Fab color="primary" aria-label="save" onClick={myForm.handleSubmit(handleSubmit)} disabled={isAddingNewStory || !myForm.formState.isValid}>
                        <Save className='text-white' />
                    </Fab>
                </span>
            </Tooltip>

            <Dialog
                open={deleteStoryModalOpen}
                onClose={() => setDeleteStoryModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Story"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the story <b>{stories[storyToDeleteIndex]?.title}</b>?
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteStoryModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteStory} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditProject;