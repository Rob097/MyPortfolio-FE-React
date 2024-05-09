import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';

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