import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import JsxParser from 'react-jsx-parser';

const HtmlContent = ({ children }) => {
    return (
        <JsxParser
            components={{ Typography, Box, Grid, Button, Card, CardActions, CardContent, CardMedia, Chip }}
            jsx={children}
        />
    )
}

export default HtmlContent;
