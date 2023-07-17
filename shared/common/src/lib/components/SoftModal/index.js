import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import borders from "../../assets/theme/base/borders";
import Box from '@mui/material/Box';
import SoftButton from '../../components/SoftButton';
import SoftTypography from "../../components/SoftTypography";

const SoftModal = (props) => {

    const { borderRadius } = borders;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: borderRadius.md,
        boxShadow: 24,
        p: 4,
    };


    return (
        <Modal
            id={props.id}
            open={props.open}
            onClose={props.handleClose}
        >
            <Fade in={props.open}>
                <Box sx={style} className="max-w-xs md:max-w-lg">
                    {props.title &&
                        <Box id="modal-header" className="border-b-2 border-b-sky-700">
                            <SoftTypography variant="h3" component="h3">
                                {props.title}
                            </SoftTypography>
                        </Box>
                    }
                    <Box id="modal-body">
                        {props.children}
                    </Box>
                    <Box id="modal-footer" sx={{ mt: 2 }}>
                        <SoftButton color="primary" sx={{ mr: 2 }} onClick={props.handleConfirm}>{props.confirmLabel}</SoftButton>
                        <SoftButton color="secondary" onClick={props.handleClose}>{props.closeLabel}</SoftButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SoftModal;