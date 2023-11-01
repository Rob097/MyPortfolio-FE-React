import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import timelineClasses from "./timeline.module.scss";
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from './CarouselItem';

export const timeline_carousel = () => {
    const { t } = useTranslation(['user-home', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanMd = isGreaterThan('md');
    const isGreaterThanSm = isGreaterThan('sm');

    /* DIARY CAROUSEL ELEMENTS */
    const diaryElements = [
        <CarouselItem key="CI-1" title="Moving to a New City 1" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-2" title="Moving to a New City 2" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-3" title="Moving to a New City 3" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-4" title="Moving to a New City 4" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-5" title="Moving to a New City 5" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-6" title="Moving to a New City 6" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />
    ];
    const sliderItems = isGreaterThanMd ? 3 : isGreaterThanSm ? 2 : 1;
    const items = [];
    for (let i = 0; i < diaryElements.length; i += sliderItems) {
        if (i % sliderItems === 0) {
            items.push(
                <Grid container spacing={5} padding={2} key={"c-" + i}>
                    {diaryElements.slice(i, i + sliderItems).map((diaryElement, index) => (
                        <Grid item xs={12} sm={6} md={4} key={diaryElement.key}>
                            {diaryElement}
                        </Grid>
                    ))}
                </Grid>
            );
        }
    }

    return (
        <div>
            <Box id='timeline-section' component='section'>
                <Container disableGutters={isGreaterThan('lg')} className={isGreaterThan('lg') ? whiteBarClasses.customContainer : ''}>
                    <Grid container>
                        <Grid item md={6} width="100%">
                            <Box id="sticky-container" display={isSmallerThan('md') ? "block" : "flex"} justifyContent="right" mr={isSmallerThan('md') ? 0 : 6} mt={6} className={timelineClasses.stickyContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h1" color="primary" fontWeight="bold" style={{ fontStyle: 'italic' }} >{t('my-story')}</Typography>
                                    <Typography variant="subtitle1" color="text" fontWeight="bold" style={{ fontStyle: 'italic' }} >Staying hard I did all of that...</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                    display: 'block',
                                    maxHeight: '60vh',
                                    overflowY: 'scroll'
                                }}
                                className={timelineClasses.scrollGradient + " hide-scrollbar"}
                            >
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2020
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2021 2022
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot className={timelineClasses.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2023
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2024 2025
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot className={timelineClasses.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2020
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2021 2022
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot className={timelineClasses.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2023
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2024 2025
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={timelineClasses.customSeparator} >
                                        <TimelineDot className={timelineClasses.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        </Grid>
                    </Grid>



                </Container>
            </Box>

            <Box id="diary-section" component='section'>
                <Container disableGutters={isGreaterThan('lg')} className={isGreaterThan('lg') ? whiteBarClasses.customContainer : ''}>
                    {/* Diary Section */}
                    <div className={timelineClasses.section}>
                        <Container maxWidth="lg">
                            <Typography variant="h4" gutterBottom>
                                Diary
                            </Typography>

                            <Carousel animation="slide" duration={2000} height={330} autoPlay={false} swipe={isSmallerThan('md')}>
                                {items}
                            </Carousel>
                        </Container>
                    </div>
                </Container>
            </Box>
        </div>
    );
}