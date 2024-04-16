import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ShowIf from 'shared/components/ShowIf';
import classes from './expandableSection.module.scss';

const ExpandableSection = ({ mainTitle, secondaryTitle, badge, info, MainBody, SecondaryBody }) => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    classes={{ content: ' flex items-center' }}
                >
                    <Typography color='dark.main' fontWeight={theme => theme.typography.fontWeightMedium} >{mainTitle}</Typography>
                    <ShowIf condition={badge !== undefined}>
                        <Chip variant="outlined" color="primary" size='small' label={badge} className='ml-2' />
                    </ShowIf>
                    <ShowIf condition={info !== undefined}>
                        <Tooltip title={info} arrow>
                            <InfoIcon className='ml-2' color='primary' />
                        </Tooltip>
                    </ShowIf>
                </AccordionSummary>
                <AccordionDetails>
                    {MainBody}
                    <ShowIf condition={SecondaryBody !== undefined}>
                        <Accordion id="secondaryAccordion" className={classes.secondaryAccordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary' />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                className={classes.secondaryAccordionSummary + ' w-fit'}
                                classes={{ content: 'flex justify-end mr-2' }}
                            >
                                <Typography color='primary'>More Options</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.secondaryAccordionDetails}>
                                <Divider />
                                {secondaryTitle && <Typography color='dark.main' fontWeight={theme => theme.typography.fontWeightMedium} className='!mt-5 !mb-5' >{secondaryTitle}</Typography>}
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