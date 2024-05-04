import CustomFileInput from '@/components/CustomFileInput';
import { CustomDatePicker, CustomTextArea, CustomTextField } from '@/components/CustomForm';
import ExpandableSection from '@/components/ExpandableSection';
import MuiEditor from '@/components/MuiEditor';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { EducationQ } from '@/models/education.model';
import { ExperienceQ } from '@/models/experience.model';
import { Project } from '@/models/project.model';
import { EducationService } from '@/services/education.service';
import { ExperienceService } from '@/services/experience.service';
import { ProjectService } from '@/services/project.service';
import { Add, ArrowBack, ChevronLeft, ChevronRight, Close, Delete, Edit, ExpandMore, Image, Receipt, School, Widgets, Work } from '@mui/icons-material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Autocomplete, Box, Button, CardActions, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, Switch, Tooltip, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { debounce } from '@mui/material/utils';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate, useParams } from 'react-router-dom';
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { MAX_FILE_SIZE } from "shared/utilities/constants";
import { Criteria, Operation, View } from "shared/utilities/criteria";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "@/components/MuiEditor/useExtensions";
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';

const ONE_MB = 1024 * 1024;
const defaultValues = {
    published: false,
    title: '',
    fromDate: null,
    toDate: null,
    description: '',
    stories: [],
    skills: [],
    coverImage: '',
};

const EditProject = () => {
    const [store, dispatch] = useDashboardStore();
    const navigate = useNavigate();
    const { t } = useTranslation("dashboard");
    const { slug: projectSlug } = useParams();
    if (!projectSlug) {
        displayMessages([{ text: 'Project ID is required', level: 'error' }]);
        navigate('/dashboard/projects');
    }
    const isCreate = useMemo(() => projectSlug === 'new', [projectSlug]);
    const [isAddingNewStory, setIsAddingNewStory] = useState(false);

    const [originalProject, setOriginalProject] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState(null);

    useEffect(() => {
        if (!isCreate) {
            // Fetch the project
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
                            coverImage: coverImage
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
        const coverImage = data.coverImage;
        const stories = data.stories;
        const skills = data.skills?.map(s => s.skill);

        if (stories) {
            stories.forEach(story => {
                story.fromDate = moment(story.fromDate).toISOString();
                story.toDate = story.toDate ? moment(story.toDate).toISOString() : null;
                if (!isCreate) {
                    story.projectId = originalProject.id;
                }
                delete story.connectedProject;
            });
        }

        let project = {
            userId: store.user.id,
            published: data.published,
            title: data.title,
            description: data.description,
            fromDate: moment(data.fromDate).toISOString(),
            toDate: data.toDate ? moment(data.toDate).toISOString() : null,
            stories: stories,
            skills: skills
        };

        if (!isCreate && originalProject) {
            project = { ...originalProject, ...project };
        }

        console.log('Project to save', project);

        if (isCreate) {
            trackPromise(
                ProjectService.create(project).then((response) => {
                    displayMessages([{ text: 'Project created successfully', level: 'success' }]);

                    if (coverImage) {
                        trackPromise(
                            ProjectService.uploadCoverImage(response.content.id, coverImage).then(() => {
                                displayMessages([{ text: 'Cover image uploaded successfully', level: 'success' }]);
                                navigate('/dashboard/projects');
                            }).catch((error) => {
                                displayMessages([{ text: 'Error while uploading the cover image', level: 'error' }]);
                                console.error(error);
                            })
                        );
                    } else {
                        navigate('/dashboard/projects');
                    }

                }).catch((error) => {
                    displayMessages([{ text: 'Error while creating the project', level: 'error' }]);
                    console.error(error);
                })
            );
        } else {
            trackPromise(
                ProjectService.update(project).then((response) => {
                    displayMessages([{ text: 'Project updated successfully', level: 'success' }]);

                    if (coverImageUrl && coverImageUrl !== originalProject.coverImage) {
                        console.log('Cover image to upload', coverImageUrl);
                        console.log('Original cover image', originalProject.coverImage);
                        trackPromise(
                            ProjectService.uploadCoverImage(projectSlug, coverImage).then(() => {
                                displayMessages([{ text: 'Cover image uploaded successfully', level: 'success' }]);
                                navigate('/dashboard/projects');
                            }).catch((error) => {
                                displayMessages([{ text: 'Error while uploading the cover image', level: 'error' }]);
                                console.error(error);
                            })
                        );
                    } else {
                        navigate('/dashboard/projects');
                    }

                }).catch((error) => {
                    displayMessages([{ text: 'Error while updating the project', level: 'error' }]);
                    console.error(error);
                })
            );
        }

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
    // Form functions -- END

    function toggleStoriesMode(isToAddNewStory) {
        setIsAddingNewStory(isToAddNewStory);
        // scroll to #stories-section:
        const storiesSection = document.getElementById('stories-section');
        if (storiesSection) {
            storiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Define the minimum width
    const minWidth = 275;
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const storiesPerPage = Math.floor(parentWidth / Math.max(250, Math.min(350, parentWidth)));
    const extensions = useExtensions({
        placeholder: "Add your own content here...",
    });


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

    const swapStories = (index, direction) => {
        let newStories = [...stories];
        if (direction === 'left' && index > 0) {
          [newStories[index].orderInProject, newStories[index - 1].orderInProject] = [newStories[index - 1].orderInProject, newStories[index].orderInProject];
        } else if (direction === 'right' && index < newStories.length - 1) {
          [newStories[index].orderInProject, newStories[index + 1].orderInProject] = [newStories[index + 1].orderInProject, newStories[index].orderInProject];
        }
        myForm.setValue('stories', newStories);
      };
      

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >{!formTitle ? (isCreate ? 'New Project' : 'Edit Project') : formTitle}</Typography>
                <Box className="w-full flex-auto mt-10 bg-white rounded-md" component="form" onSubmit={myForm.handleSubmit(handleSubmit)} noValidate>
                    <Button type="submit" variant="contained" color="primary">TEST Submit</Button>
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
                                                                name="published"
                                                                control={myForm.control}
                                                                render={({ field }) => (
                                                                    <Switch
                                                                        {...field}
                                                                        checked={field.value}
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
                                                        <Box key={story.id} className='w-full' sx={{ maxWidth: '350px', minWidth: '250px' }}>
                                                            <CustomCard id={story.id}>
                                                                <CustomCardHeader
                                                                    title={story.title}
                                                                    // Show the dates (which are moment object) formatted as MM/DD/YYYY
                                                                    subheader={<Typography variant="body2" color="primary">{moment(story.fromDate).format('MM/DD/YYYY')} - {story.toDate ? moment(story.toDate).format('MM/DD/YYYY') : 'Present'}</Typography>}
                                                                />
                                                                <CustomCardContent adaptheight="true">
                                                                    <Box className='w-full h-40' sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", }}>
                                                                        <RichTextReadOnly
                                                                            content={story.description}
                                                                            extensions={extensions}
                                                                        />
                                                                    </Box>
                                                                    <Divider className='!my-4' />
                                                                    <Box className='w-full flex flex-col space-y-4'>
                                                                        <Box className='w-full flex flex-row items-center justify-between'>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>Status</Typography>
                                                                            <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>
                                                                                <Tooltip title={story.published ? 'Published' : 'Draft'} placement='top' arrow>
                                                                                    <TripOriginRoundedIcon color={story.published ? 'success' : 'error'} />
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
                                                                        <Edit color='primary' fontSize='medium' />
                                                                        <Delete color='error' fontSize='medium' />
                                                                    </Box>
                                                                    <Box className='flex flex-row space-x-2'>
                                                                        <Tooltip title="Move Back" placement='top' arrow>
                                                                            <ChevronLeft color='primary' fontSize='medium' onClick={() => swapStories(index, 'left')} className='cursor-pointer' />
                                                                        </Tooltip>
                                                                        <Tooltip title="Move Forward" placement='top' arrow>
                                                                            <ChevronRight color='primary' fontSize='medium' onClick={() => swapStories(index, 'right')} className='cursor-pointer' />
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
                                <AddNewStory myForm={myForm} goBack={() => toggleStoriesMode(false)} isCreate={isCreate} />
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
        </>
    );
};

export default EditProject;


////////////////////////////////
// COMPONENTI CUSTOM -- BEGIN //
////////////////////////////////

const CustomCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.rounded.md,
    minHeight: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const CustomCardHeader = styled(CardHeader)(({ theme, fullheight }) => ({
    overflowX: 'auto',
    minHeight: '71px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& span': {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.size.xl
    },
    '& .MuiCardHeader-content': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& span.MuiTypography-root': {
            height: fullheight ? '100%' : 'fit-content',
            margin: 'auto 0',
            display: 'flex',
            alignItems: 'center'
        }
    }
}));

const CustomCardContent = styled(CardContent)(({ theme, adaptheight }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: adaptheight ? 'auto' : '40vh',
    height: '100%'
}));

//////////////////////////////
// COMPONENTI CUSTOM -- END //
//////////////////////////////


///////////////////////////////////
// COMPONENTI SECONDARI -- BEGIN //
///////////////////////////////////

const AddNewStory = (props) => {
    const [store, dispatch] = useDashboardStore();
    const { register, getValues, setValue, watch, handleSubmit, control, formState: { isDirty, isValid, errors }, ...rest } = useForm({
        defaultValues: {
            title: null,
            fromDate: null,
            toDate: null,
            description: null,
            relevantSections: [],
            diaryId: store.getMainDiary()?.id
        }
    });
    const { t } = useTranslation('dashboard');

    const projectTitle = props.myForm.watch('title');
    const formEducation = watch('connectedEducation');
    const formExperience = watch('connectedExperience');
    const relevantSections = watch('relevantSections');

    const [searchedEducations, setSearchedEducations] = useState([]);
    const [searchedExperiences, setSearchedExperiences] = useState([]);

    const [deleteRelevantSectionModalOpen, setDeleteRelevantSectionModalOpen] = useState(false);
    const [relevantSectionToDeleteIndex, setRelevantSectionToDeleteIndex] = useState(null);

    useEffect(() => {
        if (projectTitle) {
            setValue('connectedProject', { title: projectTitle });
        } else {
            setValue('connectedProject', { title: 'The current Project' });
        }
    }, [projectTitle]);

    useEffect(() => {
        fetchEducations();
        fetchExperiences();
    }, []);

    async function fetchEducations(query) {
        const educationField = new Criteria(EducationQ.field, Operation.equals, "*" + query?.replace(" ", "*") + "*");
        const userId = new Criteria(EducationQ.userId, Operation.equals, store.user.id);

        const criterias = [userId];
        if (query) {
            criterias.push(educationField);
        }
        const filters = new EducationQ(criterias, View.verbose, 0, 5, null);
        EducationService.getByCriteria(filters).then((response) => {
            const educations = response?.content;
            setSearchedEducations(educations);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function fetchExperiences(query) {
        const experienceField = new Criteria(ExperienceQ.title, Operation.equals, "*" + query?.replace(" ", "*") + "*");
        const userId = new Criteria(ExperienceQ.userId, Operation.equals, store.user.id);

        const criterias = [userId];
        if (query) {
            criterias.push(experienceField);
        }
        const filters = new ExperienceQ(criterias, View.verbose, 0, 5, null);
        ExperienceService.getByCriteria(filters).then((response) => {
            const experiences = response?.content;
            setSearchedExperiences(experiences);
        }).catch((error) => {
            console.error(error);
        });
    }

    function handleDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(relevantSections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setValue('relevantSections', items);
    }

    function goBack() {
        handleSubmit(submit)().then(() => {
            if (isDirty && !isValid && !window.confirm('Are you sure you want to go back? You will lose all the changes you made.')) {
                return;
            }
            props.goBack();
        }).catch(error => {
            console.error('Error while going back', error);
        });


        function submit(data) {
            const story = data;
            const stories = props.myForm.getValues('stories') || [];
            stories.push(story);
            props.myForm.setValue('stories', stories);
            console.log('Story added', story);
        }
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

    // Function to open dialog
    const handleClickOpen = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        setRelevantSectionToDeleteIndex(index);
        setDeleteRelevantSectionModalOpen(true);
    };

    // Function to confirm deletion
    const handleDeleteRelevantSection = () => {
        const newSections = [...relevantSections];
        newSections.splice(relevantSectionToDeleteIndex, 1);
        setValue('relevantSections', newSections);
        setDeleteRelevantSectionModalOpen(false);
    };

    return (
        <>
            <CustomCard className='w-full'>
                <CustomCardHeader
                    className='!p-0'
                    fullheight="true"
                    title={
                        <Box className='w-full h-full flex justify-between items-center'>
                            <Box className="h-full flex flex-row items-center space-x-4">
                                <Box onClick={goBack} className="h-full bg-background-main hover:bg-primary-main/[.05] transition-colors flex flex-row flex-auto px-4 items-center space-x-2 cursor-pointer">
                                    <ArrowBack color='primary' fontSize='large' />
                                    <Typography variant='body2' color="dark.main" fontWeight={theme => theme.typography.fontWeightMedium}>Back</Typography>
                                </Box>
                                <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl" >New Story</Typography>
                            </Box>
                            <Box className="h-full flex flex-row items-center space-x-4 px-4">
                                <Tooltip title="Last Update" placement='top' arrow>
                                    <Typography variant='body2' color="dark.main">{new Date().toLocaleDateString()}</Typography>
                                </Tooltip>
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
                                {/* Add three mui selects components which allows the user to select between some data and visualize the selected element as a chip (single select not multiple). The components are relative to: "Connected Education", "Connected Experience", and "Connected Project": */}
                                <Autocomplete
                                    id="connectedEducation"
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
                                                        <School
                                                        // sx={{ color: theme => rgba(theme.palette.primary.main, 0.5) }}
                                                        />
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
                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                    onChange={(e, value) => setValue('connectedEducation', value)}
                                />
                                <Autocomplete
                                    id="connectedExperience"
                                    options={searchedExperiences}
                                    getOptionLabel={(option) => option?.title}
                                    onInputChange={debounce((e, value) => fetchExperiences(value), 500)}
                                    renderInput={(params) => (
                                        <CustomTextField
                                            {...params}
                                            placeholder={formExperience ? null : "Connected Experience"}
                                            label={formExperience ? "Connected Experience" : null}
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
                                        <li {...props}>
                                            {option?.title}
                                        </li>
                                    )}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    onChange={(e, value) => setValue('connectedExperience', value)}
                                />
                                <Controller
                                    control={control}
                                    name="connectedProject"
                                    rules={{ required: t('Connected Project is required') }}
                                    render={({ field, fieldState: { error } }) => {
                                        return (
                                            <CustomTextField
                                                disabled
                                                placeholder={field?.value ? null : "Connected Project"}
                                                label={field?.value ? "Connected Project" : null}
                                                value={field?.value ? field?.value?.title : ''}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Widgets />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )
                                    }}
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
                                    <MuiEditor useComplete={true} existingText={field?.value ?? ''} onChange={field.onChange} error={error} />
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
                                                    <Draggable key={section.id ?? section.tmpId} draggableId={section.id ?? section.tmpId} index={index}>
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
                                                                                <Delete color='error' className='cursor-pointer' fontSize='small' onClick={event => handleClickOpen(event, index)} />
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
                                                                            <MuiEditor
                                                                                label="Description"
                                                                                existingText={section.description}
                                                                                fullWidth
                                                                                useComplete={true}
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
            </CustomCard>

            <Dialog
                open={deleteRelevantSectionModalOpen}
                onClose={() => setDeleteRelevantSectionModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Section"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the section <b>{relevantSections[relevantSectionToDeleteIndex]?.title}</b>?
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteRelevantSectionModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteRelevantSection} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

/////////////////////////////////
// COMPONENTI SECONDARI -- END //
/////////////////////////////////