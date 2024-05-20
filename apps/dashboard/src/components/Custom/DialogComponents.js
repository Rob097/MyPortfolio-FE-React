import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const CustomDialog = (props) => {

    const {isOpen, onClose, title, text, onCancel, onRemove, onDelete, onSave} = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {onCancel && (
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                )}
                {onRemove && (
                    <Button onClick={onRemove} color="primary" autoFocus>
                        Remove
                    </Button>
                )}
                {onDelete && (
                    <Button onClick={onDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                )}
                {onSave && (
                    <Button onClick={onSave} color="primary" autoFocus>
                        Save
                    </Button>
                )}
                {onClose && (
                    <Button onClick={onClose} color="primary" autoFocus>
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;