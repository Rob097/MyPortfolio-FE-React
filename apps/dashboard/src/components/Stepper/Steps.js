import Check from '@mui/icons-material/Check';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import colors from 'common-new/assets/theme/base/colors';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useStepperStore } from './StepperContext';


const Steps = ({ steps }) => {
    const [store] = useStepperStore();
    const { t, i18n } = useTranslation("dashboard");

    const isStepOptional = (step) => {
        return steps[step].isOptional;
    };

    const isStepSkipped = (step) => {
        return store.skipped.has(step);
    };


    return (
        <Stepper alternativeLabel activeStep={store.activeStep} connector={<QontoConnector />}>
            {steps.map(({ title }, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">{t('profile-builder.actions.optional')}</Typography>
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={title} {...stepProps}>
                        <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>{title}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}

export default Steps;

/****************************************************************/

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: colors.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: colors.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: colors.primary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
        color: colors.primary.main,
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};