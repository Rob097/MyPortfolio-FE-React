import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import tailwindConfig from '@/tailwind.config.js';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useMemo } from 'react';
import classes from './userTimeline.module.scss';

const UserTimeline = ({ user }) => {
    const { t } = useTranslation(['user-home', 'common']);
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
            <Box className='absolute w-full h-fit right-0' sx={{ marginBottom: '-5rem' }}>
                <DividerShape reverse />
                <DividerShape />
            </Box>
            <Container className={whiteBarClasses.customContainer}>

                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'saturate(200%) blur(30px)',
                    }}
                    className='relative rounded-xl shadow-2xl py-8'
                >
                    <Box className='absolute w-fit h-fit top-8 right-8 hidden md:block'>
                        <img src='/images/Group.svg' />
                    </Box>

                    <TimelineElement
                        userSlug={user?.slug}
                        entityType='experiences'
                        entitySlug={experience?.slug}
                        separatorImage='/images/workIcon.png'
                        title={t('quick-overview.what-i-do')}
                        subtitle={experience?.title}
                        firstCaption={t('quick-overview.company')}
                        firstOverline={`${experience?.companyName}, ${experience?.location}`}
                        secondCaption={t('quick-overview.period')}
                        secondOverline={`${new Date(experience?.fromDate).getFullYear()} - ${experience?.toDate ? new Date(experience?.toDate).getFullYear() : t('quick-overview.present')}`}
                        description={experience?.description}
                    />

                    <TimelineElement
                        userSlug={user?.slug}
                        entityType='educations'
                        entitySlug={education?.slug}
                        separatorImage='/images/educationIcon.png'
                        title={t('quick-overview.what-i-studied')}
                        subtitle={education?.field}
                        firstCaption={t('quick-overview.institute')}
                        firstOverline={education?.school}
                        secondCaption={t('quick-overview.period')}
                        secondOverline={`${new Date(education?.fromDate).getFullYear()} - ${education?.toDate ? new Date(education?.toDate).getFullYear() : t('quick-overview.present')}`}
                        description={education?.description}
                    />

                    <TimelineElement
                        userSlug={user?.slug}
                        entityType='projects'
                        entitySlug={project?.slug}
                        separatorImage='/images/projectIcon.png'
                        title={t('quick-overview.what-im-working-on')}
                        subtitle={project?.title}
                        firstCaption={t('quick-overview.period')}
                        firstOverline={`${new Date(project?.fromDate).getFullYear()} - ${project?.toDate ? new Date(project?.toDate).getFullYear() : t('quick-overview.present')}`}
                        description={project?.description}
                    />

                </Timeline>
            </Container>
        </Box>
    );
};

export default UserTimeline;

const DividerShape = ({ reverse }) => {
    const { colors } = tailwindConfig.theme;

    return (
        <div style={{ overflow: "hidden", display: (reverse && 'flex') }}>
            <svg
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: colors.dark.main, width: '100%', height: 100, transform: (reverse && 'rotate(180deg)') }}
            >
                <path
                    d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
                    opacity=".25"
                />
                <path
                    d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
                    opacity=".5"
                />
                <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
            </svg>
        </div>
    )

}

const TimelineElement = (props) => {
    return (
        <TimelineItem className={`${classes.timelineItem}`}>
            <TimelineSeparator >
                <TimelineDot className={classes.dot} >
                    <img src={props.separatorImage} className={classes.dotImage} />
                </TimelineDot>
                <TimelineConnector className={classes.centralConnector} />
            </TimelineSeparator>
            <Link href={`/users/${props.userSlug}/diary/${props.entityType}/${props.entitySlug}#mainEntityStory`} className='w-full' >
                <TimelineContent className={`${classes.timelineContent} rounded-lg ease-in duration-300 hover:border hover:shadow-lg ${classes.saturatedBG} text-center sm:text-left`}>
                    <Typography variant="h4" component="span" color="dark.main">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1">{props.subtitle}</Typography>
                    <Typography variant="caption" display='initial'>{props.firstCaption}: </Typography>
                    <Typography variant="overline" color="primary.main">{props.firstOverline}</Typography>
                    <br />
                    {props.secondCaption && <Typography variant="caption" display='initial'>{props.secondCaption}: </Typography>}
                    {props.secondOverline && <Typography variant="overline" color="primary.main">{props.secondOverline}</Typography>}
                    <Typography variant='body2' className='text-justify sm:text-left'>{props.description}</Typography>
                </TimelineContent>
            </Link>
        </TimelineItem>
    );
}