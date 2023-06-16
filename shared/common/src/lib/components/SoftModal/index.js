import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import borders from "common-lib/assets/theme/base/borders";
import SoftBox from "common-lib/components/SoftBox";
import SoftButton from 'common-lib/components/SoftButton';
import SoftTypography from "common-lib/components/SoftTypography";

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
                <SoftBox sx={style} className="max-w-xs md:max-w-lg">
                    {props.title &&
                        <SoftBox id="modal-header" className="border-b-2 border-b-sky-700">
                            <SoftTypography variant="h3" component="h3">
                                {props.title}
                            </SoftTypography>
                        </SoftBox>
                    }
                    <SoftBox id="modal-body">
                        {props.children}
                    </SoftBox>
                    <SoftBox id="modal-footer" sx={{ mt: 2 }}>
                        <SoftButton color="primary" sx={{ mr: 2 }} onClick={props.handleConfirm}>{props.confirmLabel}</SoftButton>
                        <SoftButton color="secondary" onClick={props.handleClose}>{props.closeLabel}</SoftButton>
                    </SoftBox>
                </SoftBox>
            </Fade>
        </Modal>
    );
}

export default SoftModal;