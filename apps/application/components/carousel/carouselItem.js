// CarouselItem component
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import classes from "../../pages/userProfile.module.scss";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const CarouselItem = (props) => {
    const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:


    return (
        <Paper className={classes.storyCard}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                {props.title}
            </Typography>
            <Typography variant="subtitle2" paragraph className="italic">
                {props.subtitle}
            </Typography>
            <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical", }}>
                {props.description}
            </Typography>
            <Box width="100%" className={"mt-2 hide-scrollbar overflow-x-scroll scroll-auto " + classes.scrollGradientSides} {...events} ref={ref}>
                <Stack direction="row" spacing={1}>
                    <Chip label="Clickable Link" component="a" href="#basic-chip" className='hover:cursor-grab active:cursor-grabbing' />
                    <Chip label="Clickable Link" component="a" href="#basic-chip" className='hover:cursor-grab active:cursor-grabbing' />
                    <Chip label="Clickable Link" component="a" href="#basic-chip" className='hover:cursor-grab active:cursor-grabbing' />
                </Stack>
            </Box>
        </Paper>
    );
}

export default CarouselItem;
