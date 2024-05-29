import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

const CustomDialog = (props) => {
    const { t } = useTranslation("dashboard");

    const { isOpen, onClose, title, text, onCancel, onRemove, onDelete, onSave, onConfirm, isHtml } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" dangerouslySetInnerHTML={isHtml ? { __html: text } : null}>
                    {isHtml ? null : text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {onCancel && (
                    <Button onClick={onCancel} color="primary">
                        {t('labels.cancel')}
                    </Button>
                )}
                {onRemove && (
                    <Button onClick={onRemove} color="primary" autoFocus>
                        {t('labels.remove')}
                    </Button>
                )}
                {onDelete && (
                    <Button onClick={onDelete} color="primary" autoFocus>
                        {t('labels.delete')}
                    </Button>
                )}
                {onSave && (
                    <Button onClick={onSave} color="primary" autoFocus>
                        {t('labels.save')}
                    </Button>
                )}
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary" autoFocus>
                        {t('labels.confirm')}
                    </Button>
                )}
                {onClose && (
                    <Button onClick={onClose} color="primary" autoFocus>
                        {t('labels.close')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;