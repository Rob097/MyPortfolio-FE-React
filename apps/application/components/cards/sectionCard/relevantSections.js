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
import { useMemo, useState } from 'react';

const RelevantSections = (props) => {

    const [expanded, setExpanded] = useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : 'panel0');
    };

    const entityTreeTitle = useMemo(() => {
        switch (props.entityType) {
            case EntityTypeEnum.PROJECTS:
                return 'My Projects';
            case EntityTypeEnum.EDUCATION:
                return 'My Education';
            case EntityTypeEnum.EXPERIENCE:
                return 'My Experience';
            default:
                return 'test';
        }
    }, [props.entityType]);

    return (
        <Box>
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
                            <EntitiesTree entity={props.entity} entities={props.entities} category={props.entityType} />
                        </AccordionDetails>
                    </Accordion>
                )
            }

            {

                props.story?.relevantSections?.map((sectionTmp, index) => (
                    <Accordion expanded={expanded === 'panel' + (index + 1)} onChange={handleChange('panel' + (index + 1))} className='rounded-xl shadow-md'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails isMobile={props.isMobile} story={props.story} className='overflow-y-scroll hide-scrollbar'>
                            {/* <SectionCard key={sectionTmp.title} title={sectionTmp.title} className='my-6 overflow-y-hidden' style={{ height: isMobile ? 'auto' : `calc((100vh - 145px)/${story.relevantSections.length})`, maxHeight: isMobile ? '75vh' : '' }}> */}
                            <HtmlContent>
                                {sectionTmp}
                            </HtmlContent>
                            {/* </SectionCard> */}
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

const AccordionDetails = styled((props) => (
    <MuiAccordionDetails {...props} style={{ height: props.isMobile ? 'auto' : `calc((100vh - 140px)/${props.story.relevantSections.length})`, maxHeight: props.isMobile ? '75vh' : '' }} /* className='overflow-y-scroll hide-scrollbar' */ />
))(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



// style={{height: props.isMobile ? 'auto' : `calc((100vh - 145px)/${props.story.relevantSections.length})`, maxHeight: props.isMobile ? '75vh' : ''}}