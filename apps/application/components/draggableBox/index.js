import Stack from '@mui/material/Stack';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const DraggableBox = ({ children }) => {
    const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

    return (
        <Stack direction="row" overflow={'scroll'} spacing={1} className='w-full mt-2 py-1 hide-scrollbar hover:cursor-grab active:cursor-grabbing' {...events} ref={ref}>
            {children}
        </Stack >
    );
}

export default DraggableBox;