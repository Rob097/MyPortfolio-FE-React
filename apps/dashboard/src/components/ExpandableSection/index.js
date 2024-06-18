import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShowIf from 'shared/components/ShowIf';
import classes from './expandableSection.module.scss';

const ExpandableSection = ({ mainTitle, secondaryTitle, badge, info, MainBody, SecondaryBody, defaultExpanded = false }) => {
    const { t } = useTranslation("dashboard");
    const [primaryExpanded, setPrimaryExpanded] = useState(false);
    const [secondaryExpanded, setSecondaryExpanded] = useState(false);
    const handlePrimaryAccordionToggle = (event, isPrimaryExpanded) => {
        setPrimaryExpanded(isPrimaryExpanded);
    };
    const handleSecondaryAccordionToggle = (event, isSecondaryExpanded) => {
        setSecondaryExpanded(isSecondaryExpanded);
    };

    return (
        <>
            <Accordion defaultExpanded={defaultExpanded} id={`accordion-${mainTitle}`} className={classes.primaryAccordion} onChange={handlePrimaryAccordionToggle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    classes={{ content: ' flex items-center' }}
                >
                    <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} >{mainTitle}</Typography>
                    <ShowIf condition={badge !== undefined}>
                        <Chip variant="outlined" color="primary" size='small' label={badge} className='ml-2 !hidden sm:!inline-flex' />
                    </ShowIf>
                    <ShowIf condition={info !== undefined}>
                        {/* tooltip title is html */}
                        <Tooltip arrow title={<div dangerouslySetInnerHTML={{ __html: info }}></div>}>
                            <InfoIcon className='ml-2' color='primary' />
                        </Tooltip>
                    </ShowIf>
                </AccordionSummary>
                <AccordionDetails>
                    {MainBody}
                    <ShowIf condition={SecondaryBody !== undefined}>
                        <Accordion id="secondaryAccordion" className={classes.secondaryAccordion} onChange={handleSecondaryAccordionToggle}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary' />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                className={classes.secondaryAccordionSummary + ' w-fit !p-0'}
                                classes={{ content: 'flex justify-end mr-2' }}
                            >
                                <Typography color='primary'>{secondaryExpanded ? t('labels.less-options') : t('labels.more-options')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.secondaryAccordionDetails}>
                                <Divider />
                                {secondaryTitle && <Typography variant='h4' color='dark.main' fontWeight={theme => theme.typography.fontWeightBold} className='!mt-5 !mb-5' >{secondaryTitle}</Typography>}
                                {SecondaryBody}
                            </AccordionDetails>
                        </Accordion>
                    </ShowIf>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ExpandableSection;