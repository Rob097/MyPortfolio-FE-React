import { EntitiesTreeContent as EntitiesTree } from '@/components/tree/entitiesTree';
import HtmlContent from '@/components/utils/htmlContent';
import { EntityTypeEnum } from '@/models/categories.model';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

const RelevantSections = (props) => {
    const { t } = useTranslation(['user-diary']);
    const [expanded, setExpanded] = useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : 'panel0');
    };

    const entityTreeTitle = useMemo(() => {
        switch (props.entityType) {
            case EntityTypeEnum.PROJECTS:
                return t('categories.list.my-projects');
            case EntityTypeEnum.EDUCATIONS:
                return t('categories.list.my-educations');
            case EntityTypeEnum.EXPERIENCES:
                return t('categories.list.my-experiences');
            default:
                return '';
        }
    }, [props.entityType]);

    return (
        <Box className="md:mt-10">
            {
                props.showEntityTree && (
                    <Accordion expanded={expanded === 'panel0'} onChange={handleChange('panel0')} className='rounded-xl shadow-md'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h4" component="div" fontWeight='bold'>{entityTreeTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails isMobile={props.isMobile} story={props.story} className='overflow-y-scroll hide-scrollbar'>
                            <EntitiesTree story={props.story} entity={props.entity} entities={props.entities} category={props.entityType} sticky />
                        </AccordionDetails>
                    </Accordion>
                )
            }

            {
                // order story relevantSections by "orderInStory" from the smallest to the biggest
                props.story?.relevantSections?.sort((a, b) => a.orderInStory - b.orderInStory).map((section, index) => (
                    <Accordion key={'accordition-' + (index + 1)} expanded={expanded === 'panel' + (index + 1)} onChange={handleChange('panel' + (index + 1))} className='rounded-xl shadow-md'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails isMobile={props.isMobile} story={props.story} className='overflow-y-scroll hide-scrollbar'>
                            <HtmlContent>
                                {section.description}
                            </HtmlContent>
                        </AccordionDetails>
                    </Accordion>
                ))


            }
        </Box>
    );
};

export default RelevantSections;


const Accordion = styled((props) => (
    <MuiAccordion /* disableGutters */ elevation={0} square {...props} />
))(({ theme }) => ({
    /* border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    }, */
    '&:before': {
        display: 'none',
    },
    marginBottom: theme.spacing(1)
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    /* backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)', */
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(({ isMobile, story, ...rest }) => (
    <MuiAccordionDetails {...rest} style={{
        minHeight: '20vh',
        height: isMobile ? 'auto' : (story?.relevantSections?.length > 1 ? `calc((100vh - 140px)/${story?.relevantSections?.length})` : 'fit-content'),
        maxHeight: isMobile ? '75vh' : '70vh'
    }} /* className='overflow-y-scroll hide-scrollbar' */ />
))(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// style={{height: props.isMobile ? 'auto' : `calc((100vh - 145px)/${props.story.relevantSections.length})`, maxHeight: props.isMobile ? '75vh' : ''}}