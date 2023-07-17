import { Card, CardActions, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import SoftButton from '@rob097/common-lib/components/SoftButton';
import { useTranslation } from 'react-i18next';
import { useStepperStore } from './StepperContext';

const CustomStep = (props) => {
    const [store, dispatch] = useStepperStore();
    const { t, i18n } = useTranslation("dashboard");

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
            <Box component="form" role="form" onSubmit={props.onSubmit} >
                <CardContent>
                    <Box mt={2}>
                        {props.children}
                    </Box>
                </CardContent>
                {store.activeStep < props.steps.length &&
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '80%' }}>
                            <SoftButton
                                disabled={store.activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color="secondary"
                                size="medium"
                            >
                                {t('profile-builder.actions.back')}
                            </SoftButton>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(store.activeStep) && (
                                <SoftButton variant="outlined" color="dark" onClick={handleSkip} sx={{ mr: 1 }}>
                                    {t('profile-builder.actions.skip')}
                                </SoftButton>
                            )}

                            <SoftButton variant="contained" color="dark" size="medium" type='submit'>
                                {store.activeStep === props.steps.length - 1 ? t('profile-builder.actions.finish') : t('profile-builder.actions.next')}
                            </SoftButton>
                        </Box>
                    </CardActions>
                }
            </Box>
        </Card>
    );
}

export default CustomStep;