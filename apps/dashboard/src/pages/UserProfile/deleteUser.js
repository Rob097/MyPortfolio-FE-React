import { CustomTextField } from '@/components/Custom/FormComponents';
import { UserService } from "@/services/user.service";
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "shared/stores/AuthStore";
import { useDashboardStore } from "shared/stores/DashboardStore";

const DeleteUserProfile = ({ fullName }) => {
    const { t } = useTranslation("dashboard");
    const [store, dispatch] = useDashboardStore();
    const [authStore, authDispatch] = useAuthStore();
    const navigate = useNavigate();
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [inputName, setInputName] = useState('');

    const isError = useMemo(() => inputName && inputName.toLowerCase() !== fullName.toLowerCase(), [inputName, fullName]);

    const handleDelete = () => {
        if (inputName && !isError) {
            deleteUserProfile();
            setConfirmDeleteModalOpen(false);
        }
    };

    function deleteUserProfile() {
        trackPromise(
            UserService.delete(store.user.id)
                .then(async response => {
                    console.debug('response', response);
                    authDispatch({ type: "logout" });
                    dispatch({ type: "logout" });
                    navigate('/auth/sign-up');
                }).catch(err => {
                    console.error('error', err);
                })
        );
    }

    return (
        <>
            <Button variant="contained" color='error' size='large' startIcon={<Delete fontSize='medium' />} onClick={() => setConfirmDeleteModalOpen(true)} className='!mt-4'>{t('user-profile.about.delete-profile.title')}</Button>
            <Dialog open={confirmDeleteModalOpen} onClose={() => setConfirmDeleteModalOpen(false)}>
                <DialogTitle>{t('user-profile.about.delete-profile.title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText className='!mb-8' dangerouslySetInnerHTML={{ __html: t('user-profile.about.delete-profile.confirmation', { fullName: fullName }) }} />
                    <CustomTextField
                        id="name"
                        variant="outlined"
                        label={t('user-profile.about.delete-profile.fullname')}
                        placeholder={fullName}
                        fullWidth
                        error={isError}
                        helperText={isError ? t('user-profile.about.delete-profile.error') : ''}
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteModalOpen(false)} color="primary">
                        {t('user-profile.about.delete-profile.cancel')}
                    </Button>
                    <Button onClick={handleDelete} variant='contained' color="error" startIcon={<Delete />} disabled={inputName !== fullName}>
                        {t('user-profile.about.delete-profile.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteUserProfile;