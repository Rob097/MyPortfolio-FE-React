import DraggableBox from '@/components/draggableBox';
import ShowIf from '@/components/utils/showIf';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import storyCardClasses from './storyCard.module.scss';
import { useState, useEffect } from 'react';


const StoryCard = ({ story, storyCategory, title, subtitle }) => {
    const { t } = useTranslation(['common']);
    const router = useRouter();
    const { userSlug } = router.query;

    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

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
            <CardContent className={(story.image === undefined ? 'mt-   4' : '')}>
                <Typography gutterBottom variant="h3">
                    {capitalizeFirstLetter(story.title || title)}
                </Typography>
                <ShowIf condition={subtitle!==undefined}>
                    <Typography gutterBottom variant='h5'>
                        {capitalizeFirstLetter(subtitle)}
                    </Typography>
                </ShowIf>
                <Typography variant="body2" className='overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", color: ({ palette: { text } }) => (text.secondary) }}>
                    {story.description}
                </Typography>

                <ShowIf condition={story.skills?.length > 0}>
                    <Typography variant="h5" componend="div" mt={2}>
                        {t('skills')}
                    </Typography>
                    <DraggableBox>
                        {story.skills?.map((skill) => (
                            <Chip key={"skill-"+skill.id} id={skill.id} label={skill.name} onClick={handleClick} />
                        ))}
                    </DraggableBox>
                </ShowIf>
            </CardContent>
            <CardActions>

                <Grid container mx={2}>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-start justify-center">
                        <Typography variant="caption" color="primary" fontWeight='bold'>
                            {new Date(story.date || story.updatedAt).toLocaleDateString("it-IT")}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-end justify-center">
                        <Link href={`/users/${userSlug}/diary/${storyCategory}/${story.slug}`}>
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