import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import CustomDialog from '@/components/Custom/DialogComponents';
import useExtensions from "@/components/MuiEditor/useExtensions";
import { EntityTypeEnum } from '@/models/categories.model';
import { EntitiesStatus } from "@/models/enums";
import { StoryService } from '@/services/story.service';
import { DATE_TO_DISPLAY_FORMAT_IT, DATE_TO_DISPLAY_FORMAT_EN } from '@/utilities';
import { ChevronLeft, ChevronRight, Edit } from '@mui/icons-material';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import { Box, Button, CardActions, Divider, Tooltip, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import { RichTextReadOnly } from "mui-tiptap";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const StoriesList = ({ entitiesType, handleEditStory }) => {
    const { t, i18n } = useTranslation("dashboard");
    const myForm = useFormContext();
    const extensions = useExtensions();

    const dateFormat = useMemo(() => i18n.language === 'it' ? DATE_TO_DISPLAY_FORMAT_IT : DATE_TO_DISPLAY_FORMAT_EN, [i18n.language]);

    const stories = myForm.watch('stories');
    const [storyToDeleteTmpId, setStoryToDeleteTmpId] = useState(null);
    const [removeStoryModalOpen, setRemoveStoryModalOpen] = useState(false);

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

    // Used to run the effect only once when the stories are loaded
    const storiesChangedRef = useRef(false);
    useEffect(() => {
        if (stories && stories.length > 0 && !storiesChangedRef.current) {

            // Sort the stories based on the order field if it exists from the smallest to the biggest, put at the end the stories without the order field ordered by the creation date from the newest to the oldest
            const sortedStories = stories.sort((a, b) => {
                if (a.tmpOrder !== undefined && b.tmpOrder !== undefined) {
                    return a.tmpOrder - b.tmpOrder;
                } else if (a.tmpOrder !== undefined) {
                    return -1;
                } else if (b.tmpOrder !== undefined) {
                    return 1;
                } else if (a[orderField] !== undefined && b[orderField] !== undefined) {
                    return a[orderField] - b[orderField];
                } else if (a[orderField] !== undefined) {
                    return -1;
                } else if (b[orderField] !== undefined) {
                    return 1;
                } else {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
            });

            // set the field "tmpOrder" to each story based on the index in the sorted array
            const orderedStories = sortedStories.map((story, index) => {
                story.tmpOrder = index;
                return story;
            });

            // Mark that the effect has run once
            storiesChangedRef.current = true;

            // Update the sortedStories field in the form
            myForm.setValue('stories', orderedStories);
        }
    }, [stories]);

    // Function to swap the stories based on the index and the direction
    // we pass story.tmpOrder as index because the index in the jsx code refers to the index in the page
    const swapStories = (index, direction) => {
        let newStories = [...stories];
        if (direction === 'left' && index > 0) {
            [newStories[index], newStories[index - 1]] = [newStories[index - 1], newStories[index]];
        } else if (direction === 'right' && index < newStories.length - 1) {
            [newStories[index], newStories[index + 1]] = [newStories[index + 1], newStories[index]];
        }

        // Update the tmpOrder field for each story
        newStories.forEach((story, index) => {
            story.tmpOrder = index;
        });

        myForm.setValue('stories', newStories);
    };

    const handleOpenDeleteStoryDialog = (event, tmpId) => {
        event.stopPropagation();
        event.preventDefault();
        setStoryToDeleteTmpId(tmpId);
        setRemoveStoryModalOpen(true);
    }

    const handleRemoveStory = () => {
        const storyIndex = stories.findIndex(story => story.tmpId === storyToDeleteTmpId);
        const storyToRemove = stories[storyIndex];
        const storyId = storyToRemove?.id;

        const removeStoryFromList = () => {

            // Remove the story from the list
            if (storyIndex !== -1) {
                stories.splice(storyIndex, 1);
            }

            // set the field "tmpOrder" of each story as the current index
            stories.forEach((story, index) => {
                story.tmpOrder = index;
            });

            // set the new list of stories
            myForm.setValue('stories', stories);
        }

        if (storyId) {
            StoryService.removeEntity(storyId, EntityTypeEnum.getLabel(entitiesType, false, false))
                .then(() => {
                    removeStoryFromList();
                    displayMessages([{ text: t('entities.edit.stories-list.remove-ok'), severity: 'success' }]);
                })
                .catch((error) => {
                    displayMessages([{ text: t('entities.edit.stories-list.remove-ko'), severity: 'error' }]);
                    console.error('Error removing story:', error)
                })
                .finally(() => setRemoveStoryModalOpen(false));
        } else {
            removeStoryFromList();
            setRemoveStoryModalOpen(false);
        }
    }

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
            <CustomCard>
                <CustomCardContent ref={parentRef} id="stories-content-container" className={stories?.length == 0 ? 'justify-center items-center' : 'justify-start items-start'}>
                    {stories?.length == 0 ? (
                        <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl text-center">
                            {t(`entities.edit.stories-list.no-stories-${entitiesType}`, { entity: EntityTypeEnum.getLabel(entitiesType, false, false, t) })}
                        </Typography>
                    ) :
                        <>
                            <Box className='w-full flex flex-row space-x-4'>
                                {stories.slice((currentPage - 1) * storiesPerPage, currentPage * storiesPerPage).map((story, index) => (
                                    <Box key={story.id ?? story.tmpId} className='w-full' sx={{ maxWidth: '350px', minWidth: '250px' }}>
                                        <CustomCard id={story.id}>
                                            <CustomCardHeader
                                                title={story.title}
                                                // Show the dates (which are moment object) formatted as MM/DD/YYYY
                                                subheader={<Typography variant="body2" color="primary">{moment(story.fromDate).format(dateFormat)} - {story.toDate ? moment(story.toDate).format(dateFormat) : t('labels.present')}</Typography>}
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
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>{t('labels.status.title')}</Typography>
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>
                                                            <Tooltip title={t(`labels.status.${story.status ? story.status.toLowerCase() : EntitiesStatus.DRAFT.toLowerCase()}`)} placement='top' arrow>
                                                                <TripOriginRoundedIcon color={story.status === EntitiesStatus.PUBLISHED ? 'success' : 'error'} />
                                                            </Tooltip>
                                                        </Typography>
                                                    </Box>
                                                    <Box className='w-full flex flex-row items-center justify-between'>
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>{t('labels.relevant-sections')}</Typography>
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>{story.relevantSections?.length ?? 0}</Typography>
                                                    </Box>
                                                    <Box className='w-full flex flex-row items-center justify-between'>
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold}>{t('labels.skills')}</Typography>
                                                        <Typography variant="body2" fontWeight={theme => theme.typography.fontWeightBold} color='primary'>{story.skills?.length ?? 0}</Typography>
                                                    </Box>
                                                </Box>
                                            </CustomCardContent>
                                            <CardActions className='flex flex-row justify-between !px-4'>
                                                <Box className='flex flex-row space-x-2'>
                                                    <Tooltip title={t('labels.edit')} placement='top' arrow>
                                                        <Button variant='text' className='!w-fit !min-w-fit' classes={{ startIcon: '!m-0' }} onClick={() => handleEditStory(story)} startIcon={
                                                            <Edit color='primary' fontSize='medium' />
                                                        } />
                                                    </Tooltip>
                                                    <Tooltip title={t(`entities.edit.stories-list.remove-from-${entitiesType}`)} placement='top' arrow>
                                                        <Button variant='text' color='error' className='!w-fit !min-w-fit' classes={{ startIcon: '!m-0' }} onClick={(e) => handleOpenDeleteStoryDialog(e, story.tmpId)} startIcon={
                                                            <LinkOffIcon color='error' fontSize='medium' />
                                                        } />
                                                    </Tooltip>
                                                </Box>
                                                <Box className='flex flex-row space-x-2'>
                                                    <Tooltip title={t('entities.edit.stories-list.move-back')} placement='top' arrow>
                                                        <ChevronLeft color='primary' fontSize='medium' onClick={() => swapStories(story.tmpOrder, 'left')} className={story.tmpOrder === 0 ? 'cursor-not-allowed !text-gray-300' : 'cursor-pointer'} />
                                                    </Tooltip>
                                                    <Tooltip title={t('entities.edit.stories-list.move-forward')} placement='top' arrow>
                                                        <ChevronRight color='primary' fontSize='medium' onClick={() => swapStories(story.tmpOrder, 'right')} className={story.tmpOrder === stories.length - 1 ? 'cursor-not-allowed !text-gray-300' : 'cursor-pointer'} />
                                                    </Tooltip>
                                                </Box>
                                            </CardActions>
                                        </CustomCard>
                                    </Box>
                                ))}
                            </Box>
                            <Pagination count={storiesPerPage > 0 ? Math.ceil(stories.length / storiesPerPage) : 1} className='mx-auto my-4' page={currentPage} onChange={(event, page) => setCurrentPage(page)} />
                        </>
                    }
                </CustomCardContent>
            </CustomCard>

            <CustomDialog
                isOpen={removeStoryModalOpen}
                title={t('entities.edit.stories-list.remove-dialog.title')}
                isHtml={true}
                text={t('entities.edit.stories-list.remove-dialog.text', { title: stories.find(story => story.tmpId === storyToDeleteTmpId)?.title })}
                onCancel={() => setRemoveStoryModalOpen(false)}
                onRemove={handleRemoveStory}
            />

        </>
    );
}

export default StoriesList;