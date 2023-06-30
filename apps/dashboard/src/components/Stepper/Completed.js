import { CardActions, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Completed = (props) => {

    return (
        <>
            <CardContent>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {props.content}
                </Typography>
            </CardContent>
            {props.reset &&
                <CardActions>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={props.reset.action}>{props.reset.label}</Button>
                    </Box>
                </CardActions>
            }
        </>
    );
}

export default Completed;
