import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShowIf from '@/components/utils/showIf';

export default function BasicAccordion(props) {
  return (
    <div>
      <ShowIf condition={props.firstTitle!==undefined && props.firstContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{props.firstTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.firstContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.secondTitle!==undefined && props.secondContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
          <Typography>{props.secondTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.secondContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.thirdTitle!==undefined && props.thirdContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
          <Typography>{props.thirdTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.thirdContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.fourthTitle!==undefined && props.fourthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
          <Typography>{props.fourthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.fourthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.fifthTitle!==undefined && props.fifthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
          <Typography>{props.fifthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.fifthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.sixthTitle!==undefined && props.sixthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
          <Typography>{props.sixthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.sixthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.seventhTitle!==undefined && props.seventhContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
          <Typography>{props.seventhTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.seventhContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.eighthTitle!==undefined && props.eighthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
          <Typography>{props.eighthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.eighthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.ninthTitle!==undefined && props.ninthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9a-content"
            id="panel9a-header"
          >
          <Typography>{props.ninthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.ninthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
      <ShowIf condition={props.tenthTitle!==undefined && props.tenthContent!==undefined}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10a-content"
            id="panel10a-header"
          >
          <Typography>{props.tenthTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {props.tenthContent}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ShowIf>
    </div>
  );
}
