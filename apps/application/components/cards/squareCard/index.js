import DraggableBox from '@/components/draggableBox';
import ShowIf from '@/components/utils/showIf';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import squareCardClasses from './squareCard.module.scss';
import Image from 'next/image';

const SquareCard = ({ image, title, subtitle, description, chips, bottomCaption, buttons }) => {
    const { t } = useTranslation(['common']);

    function capitalizeFirstLetter(string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    }

    const handleClick = (event) => {
        console.info('You clicked the Chip: ', event.target.id);
    };

    return (
        <Card sx={{ maxWidth: 345 }} className={(!image ? squareCardClasses.customCard : '') + ' shadow-lg z-10 rounded-lg text-left m-2'}>

            <ShowIf condition={image !== undefined}>
                <CardMedia
                    className={squareCardClasses.customCardMedia}
                    title={title + (subtitle ? (' - ' + subtitle) : '')}
                >
                    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '10rem', maxHeight: '20rem' }}>
                        <Image src={image} layout="fill" objectFit="cover" />
                    </div>
                </CardMedia>

            </ShowIf>
            <CardContent className={(image === undefined ? 'mt-4' : '')}>
                <Link href={buttons[0]?.link} scroll={!buttons[0]?.blockScroll}>
                    <Typography gutterBottom variant="h3">
                        {capitalizeFirstLetter(title)}
                    </Typography>
                </Link>
                <ShowIf condition={subtitle !== undefined}>
                    <Typography gutterBottom variant='h5'>
                        {capitalizeFirstLetter(subtitle)}
                    </Typography>
                </ShowIf>
                <Typography variant="body2" className='overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", color: ({ palette: { text } }) => (text.secondary) }}>
                    {description}
                </Typography>

                <ShowIf condition={chips?.length > 0}>
                    <Typography variant="h5" componend="div" mt={2}>
                        {t('skills')}
                    </Typography>
                    <DraggableBox>
                        {chips?.map((chip) => (
                            <Chip key={"chip-" + chip.id} id={chip.id} label={chip.name} onClick={handleClick} />
                        ))}
                    </DraggableBox>
                </ShowIf>
            </CardContent>
            <CardActions>
                <Grid container mx={2}>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-start justify-center">
                        <ShowIf condition={bottomCaption !== undefined}>
                            <Typography variant="caption" color="primary" fontWeight='bold'>
                                {bottomCaption}
                            </Typography>
                        </ShowIf>
                    </Grid>
                    <Grid item xs={12} lg={6} className="flex items-center lg:justify-end justify-center">
                        <Box className="flex flex-row justify-end">
                            {buttons[1] !== undefined &&
                                <Link href={buttons[1]?.link} scroll={!buttons[1]?.blockScroll}>
                                    <Button variant="outlined" color="primary" size="small" className='h-fit py-2 mr-2 rounded-full whitespace-nowrap'>
                                        {buttons[1]?.label}
                                    </Button>
                                </Link>
                            }
                            {buttons[0] !== undefined &&
                                <Link href={buttons[0]?.link} scroll={!buttons[0]?.blockScroll}>
                                    <Button variant="contained" color="primary" size="small" className='h-fit py-2 rounded-full whitespace-nowrap'>
                                        {buttons[0]?.label}
                                    </Button>
                                </Link>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );

};

export default SquareCard;