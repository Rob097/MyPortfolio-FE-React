import { Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import SoftButton from '@rob097/common-lib/components/SoftButton';
import SoftTypography from '@rob097/common-lib/components/SoftTypography';
import { useTranslation } from 'next-i18next';
import DraggableBox from '../draggableBox';
import ShowIf from '../showIf';
import storyCardClasses from './storyCard.module.scss';


const StoryCard = (props) => {
    const { t } = useTranslation(['common']);


    const handleClick = (event) => {
        console.info('You clicked the Chip: ', event.target.id);
    };

    return (
        <Card sx={{ maxWidth: 345 }} className={(!props.image ? storyCardClasses.customCard : '') + ' shadow-lg z-10'}>

            <ShowIf condition={props.image !== undefined}>
                <CardMedia
                    component="img"
                    className={storyCardClasses.customCardMedia}
                    image={props.image}
                    title="green iguana"
                />
            </ShowIf>
            <CardContent className={(props.image === undefined ? 'mt-4' : '')}>
                <Typography gutterBottom variant="h4">
                    {props.title}
                </Typography>
                <SoftTypography variant="body2" className='overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", color: ({ palette: { text } }) => (text.secondary) }}>
                    {props.preview}
                </SoftTypography>

                <ShowIf condition={props.skills?.length > 0}>
                    <Typography variant="h5" componend="div" mt={2}>
                        {t('skills')}
                    </Typography>
                    <DraggableBox>
                        {props.skills?.map((skill) => (
                            <Chip key={skill} id={skill} label={skill} onClick={handleClick} />
                        ))}
                    </DraggableBox>
                </ShowIf>
            </CardContent>
            <CardActions>

                <Grid container mx={2}>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-start justify-center">
                        <SoftTypography variant="caption" color="primary" fontWeight='bold'>
                            {props.date}
                        </SoftTypography>

                    </Grid>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-end justify-center">
                        <SoftButton variant="contained" color="primary" size="small" className='rounded-full whitespace-nowrap' >
                            {t('read-more')}
                        </SoftButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default StoryCard