import { CardActions, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SoftButton from '@rob097/common-lib/components/SoftButton';

const Completed = (props) => {

    return (
        <>
            <CardContent className='w-fit m-auto'>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    {/* Replace 'party-popper_1f389.png' with the actual filename and extension of your image */}
                    <img src={props.img} alt="Party Pooper" />
                </Box>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {props.content}
                </Typography>
            </CardContent>
            {props.reset &&
                <CardActions style={{ justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <SoftButton onClick={props.reset.action} size="large" color="dark">{props.reset.label}</SoftButton>
                    </Box>
                </CardActions>
            }
        </>
    );
}

export default Completed;
