import JsxParser from 'react-jsx-parser';
import { Typography, Box, Grid, Button, Card, CardActions, CardContent, CardMedia, Chip,  } from '@mui/material';

const HtmlContent = ({ children }) => {
    return (
        <JsxParser
            components={{ Typography, Box, Grid, Button, Card, CardActions, CardContent, CardMedia, Chip }}
            jsx={children}
        />
    )
}

export default HtmlContent;
