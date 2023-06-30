import { Card, CardActions, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SoftBox from "common-lib/components/SoftBox";
import { useStepperStore } from './StepperContext';

const CustomStep = (props) => {
    const [store, dispatch] = useStepperStore();

    const handleBack = () => {
        dispatch({
            type: "back"
        });
    }
    const handleSkip = () => {
        dispatch({
            type: "skip"
        });
    }

    const isStepOptional = (step) => {
        return props.steps[step].isOptional;
    };

    return (
        <Card p={10}>
            <SoftBox component="form" role="form" onSubmit={props.onSubmit} >
                <CardContent>
                    <Box mt={2}>
                        {props.children}
                    </Box>
                </CardContent>
                {store.activeStep < props.steps.length &&
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '80%' }}>
                            <Button
                                disabled={store.activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                variant="outlined" color="secondary" size="medium"
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(store.activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button variant="contained" color="primary" size="medium" className='text-white' type='submit'>
                                {store.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </CardActions>
                }
            </SoftBox>
        </Card>
    );
}

export default CustomStep;