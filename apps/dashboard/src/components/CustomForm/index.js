import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.main,
    },
}));

export const CustomTextArea = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        padding: 0,
        backgroundColor: theme.palette.background.main
    },
    '& .MuiInputBase-input': {        
        padding: '16.5px 14px',
    },
    '& .MuiInputLabel-root:not(.MuiFormLabel-filled, .Mui-focused)': {
        top: '0 !important',
        transform: 'translateY(16px) !important'
    }
}));

export const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    width: '100%',
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.main,
    },
}));