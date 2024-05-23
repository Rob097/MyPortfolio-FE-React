import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

export const CustomCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.rounded.md,
    minHeight: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

export const CustomCardHeader = styled(CardHeader)(({ theme, fullheight }) => ({
    overflowX: 'auto',
    minHeight: '71px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& span': {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.size.xl
    },
    '& .MuiCardHeader-content': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& span.MuiTypography-root': {
            height: fullheight ? '100%' : 'fit-content',
            margin: 'auto 0',
            display: 'flex',
            alignItems: 'center'
        }
    }
}));

export const CustomCardContent = styled(CardContent)(({ theme, adaptheight }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: adaptheight ? 'auto' : '40vh',
    height: '100%'
}));

export const CardWithBorder = (props) => {

    const borderWidth = useMemo(() => {
        if (!props.border) return;

        switch (props.border) {
            case 'left':
                return 'border-l-8';
            case 'right':
                return 'border-r-8';
            case 'top':
                return 'border-t-8';
            case 'bottom':
                return 'border-b-8';
            default:
                return '';
        }
    }, [props.borderWidth]);

    const borderColor = useMemo(() => {
        if (!props.borderColor) {
            return 'border-primary-main';
        } else {
            return `border-${props.borderColor}`;
        }
    }, [props.borderColor]);

    return (

        <Box
            className={`w-full h-fit flex flex-col bg-white rounded-lg shadow-md px-4 py-4 lg:px-2 2xl:px-4 ${borderWidth} ${borderColor} ${props.className}`}
        >
            {props.children}
        </Box>

    );
}