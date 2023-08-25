import ShowIf from '@/components/utils/showIf';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DraggableBox from '@/components/draggableBox';
import storyCardClasses from './storyCard.module.scss';


const StoryCard = ({ story }) => {
    const { t } = useTranslation(['common']);
    const router = useRouter();
    const { userId } = router.query;

    const handleClick = (event) => {
        console.info('You clicked the Chip: ', event.target.id);
    };

    return (
        <Card sx={{ maxWidth: 345 }} className={(!story.image ? storyCardClasses.customCard : '') + ' shadow-lg z-10 rounded-lg'}>

            <ShowIf condition={story.image !== undefined}>
                <CardMedia
                    component="img"
                    className={storyCardClasses.customCardMedia}
                    image={story.image}
                    title="green iguana"
                />
            </ShowIf>
            <CardContent className={(story.image === undefined ? 'mt-4' : '')}>
                <Typography gutterBottom variant="h3">
                    {story.title}
                </Typography>
                <Typography variant="body2" className='overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", color: ({ palette: { text } }) => (text.secondary) }}>
                    {story.preview}
                </Typography>

                <ShowIf condition={story.skills?.length > 0}>
                    <Typography variant="h5" componend="div" mt={2}>
                        {t('skills')}
                    </Typography>
                    <DraggableBox>
                        {story.skills?.map((skill) => (
                            <Chip key={skill} id={skill} label={skill} onClick={handleClick} />
                        ))}
                    </DraggableBox>
                </ShowIf>
            </CardContent>
            <CardActions>

                <Grid container mx={2}>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-start justify-center">
                        <Typography variant="caption" color="primary" fontWeight='bold'>
                            {story.date}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-end justify-center">
                        <Link href={`/users/${userId}/diary/${story.slug}`}>
                            <Button variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap' >
                                {t('read-more')}
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default StoryCard