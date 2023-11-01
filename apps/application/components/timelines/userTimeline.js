import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import classes from './userTimeline.module.scss';
import { useMemo } from 'react';

const UserTimeline = ({ user }) => {
    const experience = useMemo(() => getRelevantEntity(user?.experiences), [user?.experiences]);
    const education = useMemo(() => getRelevantEntity(user?.educations), [user?.educations]);
    const project = useMemo(() => getRelevantEntity(user?.projects), [user?.projects]);

    function getRelevantEntity(entities) {
        return entities?.sort((a, b) => {
            if (a.toDate && b.toDate) {
                return new Date(b.toDate) - new Date(a.toDate);
            }
            if (a.toDate && !b.toDate) {
                return 1;
            }
            if (!a.toDate && b.toDate) {
                return -1;
            }
            return new Date(b.fromDate) - new Date(a.fromDate);
        })[0];
    }


    return (
        <Box className='flex items-end'>
            <Box className='absolute w-full h-96 right-0 hidden sm:block'>
                <div className={`w-3/5 md:w-2/5 h-full ml-0 mr-auto bg-dark-main shape ${classes.shape}`} style={{ opacity: 0.9 }} ></div>
            </Box>
        <Container className={whiteBarClasses.customContainer}>

            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
                className='relative sm:bg-white sm:rounded-xl sm:shadow-xl sm:py-8'
            >
                <Box className='absolute w-fit h-fit top-8 right-8 hidden md:block'>
                <img src='/images/Group.svg'/>
                </Box>
                <TimelineItem className={`${classes.timelineItem} ${classes.odd}`}>
                    <TimelineSeparator >
                        {/* <TimelineConnector className={classes.peripheralConnector} /> */}
                        <TimelineDot className={classes.dot} >
                            <img src='/images/workIcon.png' className={classes.dotImage} />
                        </TimelineDot>
                        <TimelineConnector className={classes.centralConnector} />
                    </TimelineSeparator>
                    <TimelineContent className={`${classes.timelineContent}`} >
                        <Typography variant="h4" component="span" color="dark.main">
                            What I do
                        </Typography>
                        <Typography variant="subtitle1">{experience?.title}</Typography>
                        <Typography variant="caption" display={{xs: 'none', sm: 'initial'}} >Company: </Typography>
                        <Typography variant="overline" color="primary.main">{experience?.companyName}, {experience?.location}</Typography>
                        <br />
                        <Typography variant="caption" display={{xs: 'none', sm: 'initial'}} >Date: </Typography>
                        <Typography variant="overline" color="primary.main">{new Date(experience?.fromDate).getFullYear()} - {experience?.toDate ? new Date(experience?.toDate).getFullYear() : 'Present'}</Typography>
                        <Typography variant='body2'>{experience?.description}</Typography>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem className={`${classes.timelineItem} ${classes.even}`}>
                    <TimelineSeparator >
                        <TimelineDot className={classes.dot} >
                            <img src='/images/educationIcon.png' className={classes.dotImage} />
                        </TimelineDot>
                        <TimelineConnector className={classes.centralConnector} />
                    </TimelineSeparator>
                    <TimelineContent className={`${classes.timelineContent}`} >
                        <Typography variant="h4" component="span" color="dark.main">
                            What I studied
                        </Typography>
                        <Typography variant="subtitle1">{education?.field}</Typography>
                        <Typography variant="caption" display={{xs: 'none', sm: 'initial'}} >Institution: </Typography>
                        <Typography variant="overline" color="primary.main">{education?.school}</Typography>
                        <br />
                        <Typography variant="caption" display={{xs: 'none', sm: 'initial'}} >Date: </Typography>
                        <Typography variant="overline" color="primary.main">{new Date(education?.fromDate).getFullYear()} - {education?.toDate ? new Date(education?.toDate).getFullYear() : 'Present'}</Typography>
                        <Typography variant='body2'>{education?.description}</Typography>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem className={`${classes.timelineItem} ${classes.odd}`}>
                    <TimelineSeparator >
                        <TimelineDot className={classes.dot} >
                            <img src='/images/projectIcon.png' className={classes.dotImage} />
                        </TimelineDot>
                        <TimelineConnector className={classes.centralConnector} />
                    </TimelineSeparator>
                    <TimelineContent className={`${classes.timelineContent}`} >
                        <Typography variant="h4" component="span" color="dark.main">
                            What I've been working on
                        </Typography>
                        <Typography variant="subtitle1" >{project?.title}</Typography>
                        <Typography variant="caption" display={{xs: 'none', sm: 'initial'}} >Date: </Typography>
                        <Typography variant="overline" color="primary.main">{new Date(project?.fromDate).getFullYear()} - {project?.toDate ? new Date(project?.toDate).getFullYear() : 'Present'}</Typography>
                        <Typography variant='body2'>{project?.description}</Typography>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </Container>
        </Box>
    );
};

export default UserTimeline;