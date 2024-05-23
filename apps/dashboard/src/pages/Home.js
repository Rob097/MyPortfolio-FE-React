import { CardWithBorder } from "@/components/Custom/CardComponents";
import { DATE_TO_DISPLAY_FORMAT_EN, DATE_TO_DISPLAY_FORMAT_IT } from '@/utilities';
import { AutoGraph, Inbox, School, TripOriginRounded, Widgets, Work } from "@mui/icons-material";
import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { t } from 'i18next';
import moment from 'moment';
import { useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useDashboardStore } from "shared/stores/DashboardStore";

const SHOW_ANALYTICS_ALERT = true;
const Home = () => {
    const [store, dispatch] = useDashboardStore();
    const { t, i18n } = useTranslation("dashboard");

    const projects = useMemo(() => store.user?.projects, [store.user]);
    const experiences = useMemo(() => store.user?.experiences, [store.user]);
    const educations = useMemo(() => store.user?.educations, [store.user]);

    const experience = useMemo(() => getRelevantEntity(store.user?.experiences), [store.user?.experiences]);
    const education = useMemo(() => getRelevantEntity(store.user?.educations), [store.user?.educations]);
    const project = useMemo(() => getRelevantEntity(store.user?.projects), [store.user?.projects]);

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
        <Box className="mt-2">
            <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className={`!text-4xl !my-4`} >{t('home.title')}</Typography>

            {SHOW_ANALYTICS_ALERT && (<CardWithBorder border='left' className='!mt-4 mb-20'>
                <Box className='flex flex-row items-center p-4'>
                    <Typography variant='h2'>{t('home.analytics-alert')}</Typography>
                    <AutoGraph className='!ml-4' color="primary" fontSize="large" />
                </Box>
            </CardWithBorder>
            )}

            <Grid container spacing={2} className='!mt-4'>
                <Grid item xs={12} md={6} lg={4}>
                    <EntityCounter title={t('labels.experiences')} link='/dashboard/experiences' number={experiences?.length || 0} icon={Work} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <EntityCounter title={t('labels.educations')} link='/dashboard/educations' number={educations?.length || 0} icon={School} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <EntityCounter title={t('labels.projects')} link='/dashboard/projects' number={projects?.length || 0} icon={Widgets} />
                </Grid>
            </Grid>

            <Grid container spacing={2} className='!mt-4'>
                <Grid item xs={12} md={6} lg={4}>
                    <MainEntity
                        topic={t('home.experience-title')}
                        image='/images/experience.png'
                        entity={experience}
                        type='experience'
                        newLink='/dashboard/experiences/new'
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MainEntity
                        topic={t('home.education-title')}
                        image={`${process.env.REACT_APP_DASHBOARD_URL}/images/education.png`}
                        entity={education}
                        type='education'
                        newLink='/dashboard/educations/new'
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MainEntity
                        topic={t('home.project-title')}
                        image={`${process.env.REACT_APP_DASHBOARD_URL}/images/project.png`}
                        entity={project}
                        type='project'
                        newLink='/dashboard/projects/new'
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;

const MainEntity = (props) => {
    const { t, i18n } = useTranslation("dashboard");

    const dateFormat = useMemo(() => i18n.language === 'it' ? DATE_TO_DISPLAY_FORMAT_IT : DATE_TO_DISPLAY_FORMAT_EN, [i18n.language]);

    return (
        <CardWithBorder border='top'>
            <Box className='flex flex-row justify-between items-center px-4 py-2 lg:px-2 2xl:px-4 border-b border-gray-200'>
                <Typography variant='h3' className="!font-semibold !text-2xl lg:!text-base 2xl:!text-2xl">{props.topic}</Typography>
                <img src={props.image} alt={props.topic} className="w-12 h-12" />
            </Box>
            <Box className='mt-6 mb-4 px-4 lg:px-2 2xl:px-4'>
                {
                    !props.entity ? (
                        <>
                            <Box className='w-full h-full min-h-40 flex flex-col justify-center items-center'>
                                <Inbox className="!text-gray-400" fontSize='large' />
                                <Typography variant='h4' className="!font-semibold text-black !text-lg lg:!text-sm 2xl:!text-lg">{t('home.nothing-to-show')}</Typography>
                                <Typography variant='subtitle1' className="!text-base lg:!text-sm 2xl:!text-base">
                                    <Link to={props.newLink}>{t(`entities.list.add-new-${props.type}s`)}</Link> {t('home.start')}
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Tooltip title={t('home.view-main-entity', { entity: t(`labels.${props.type}`) })} arrow placement='top'>
                                <Link to={`/dashboard/${props.type}s/${props.entity.slug}`} className='block w-fit'>
                                    <Typography variant='h4' className="!font-semibold text-black !text-lg lg:!text-sm 2xl:!text-lg">{props.entity.title ?? props.entity.field}</Typography>
                                </Link>
                            </Tooltip>
                            {(props.entity.companyName || props.entity.school) && <Typography variant='subtitle1' className="!text-base lg:!text-sm 2xl:!text-base">{props.entity.companyName ?? props.entity.school}</Typography>}
                            {props.entity.fromDate && <Typography variant='subtitle2' color="primary" className="!text-sm">
                                {`${moment(props.entity.fromDate).format(dateFormat)} - ${props.entity.toDate ? moment(props.entity.toDate).format(dateFormat) : t('labels.present')}`}
                            </Typography>}

                            <Typography variant='body1' className="!mt-2">{props.entity.description}</Typography>
                            <Divider className='!my-4' />
                            <Box className='flex flex-row justify-between items-center my-1'>
                                <Typography variant='h5' className="!text-base lg:!text-sm 2xl:!text-base">{t('home.number-of-stories')}</Typography>
                                <Typography variant='h5'>{props.entity.stories?.length}</Typography>
                            </Box>
                            <Box className='flex flex-row justify-between items-center my-1'>
                                <Typography variant='h5' className="!text-base lg:!text-sm 2xl:!text-base">{t('home.number-of-skills')}</Typography>
                                <Typography variant='h5'>{props.entity.skills?.length}</Typography>
                            </Box>
                            <Box className='flex flex-row justify-between items-center my-1'>
                                <Typography variant='h5' className="!text-base lg:!text-sm 2xl:!text-base">{t('labels.status.title')}</Typography>
                                <TripOriginRounded className={props.entity.status === 'PUBLISHED' ? 'text-success-main' : 'text-gray-400'} fontSize='small' />
                            </Box>
                        </>
                    )
                }
            </Box>
        </CardWithBorder>
    );
}

const EntityCounter = (props) => {
    const { t } = useTranslation("dashboard");

    const Icon = props.icon;
    return (
        <CardWithBorder border='left'>
            <Box className='flex flex-row justify-between items-center px-4 py-4 lg:px-2 2xl:px-4'>
                <Box className='flex flex-col space-y-4'>
                    <Tooltip title={t('labels.view-all')} arrow placement='top'>
                        <Link to={props.link}>
                            <Typography variant='h3' className="!text-xl lg:!text-base 2xl:!text-2xl">{props.title}</Typography>
                        </Link>
                    </Tooltip>
                    <Typography variant='h3' fontWeight={theme => theme.typography.fontWeightBold}>{props.number}</Typography>
                </Box>
                <Box className='w-fit h-fit bg-primary-main rounded-xl p-4 lg:p-2 2xl:p-4'>
                    <Icon className="!text-xl lg:!text-lg 2xl:!text-2xl text-white" />
                </Box>
            </Box>
        </CardWithBorder>
    );
}