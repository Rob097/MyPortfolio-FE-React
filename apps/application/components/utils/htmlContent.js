import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import JsxParser from 'react-jsx-parser';
import CodeEditor from './CodeEditor';

const HtmlContent = ({ children }) => {
    return (
        <JsxParser
            components={{ Typography, Box, Grid, Button, Card, CardActions, CardContent, CardMedia, Chip, CodeEditor }}
            jsx={children}
        />
    )
}

export default HtmlContent;
