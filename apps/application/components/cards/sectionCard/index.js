import { Box, Typography } from '@mui/material';

const SectionCard = (props) => {
    return (
        <Box className={props.className + ' flex flex-col bg-white rounded-xl shadow-md'} style={{...props.style}}>

            <Box className='py-4 px-6 border-b'>
                <Typography variant="subtitle" fontWeight='bold'>{props.title}</Typography>
            </Box>
            <Box className='p-4 overflow-y-scroll hide-scrollbar text-lg'>
                {props.children}
            </Box>

        </Box>
    )
}

export default SectionCard;