import { displayMessages } from '@/components/alerts';
import { AttachmentService } from '@/services/attachment.service';
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { REPLACE_MEDIA_MANAGER, useDashboardStore } from "shared/stores/DashboardStore";
import { MAX_FILE_SIZE } from "shared/utilities/constants";

const ONE_MB = 1024 * 1024;
const CustomFileInput = ({ field, label, replaceFile, removeFile, onlyImages, onlyDocuments, ...rest }) => {
    const { t } = useTranslation("dashboard");
    const [store, dispatch] = useDashboardStore();

    const acceptImages = { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'] };
    const acceptDocuments = { 'application/pdf': ['.pdf', '.PDF'], 'application/msword': ['.doc', '.docx'], 'text/plain': ['.txt'] };
    const accept = onlyImages ? acceptImages : onlyDocuments ? acceptDocuments : { ...acceptImages, ...acceptDocuments };

    function openCustomFileDialog() {
        dispatch({ type: REPLACE_MEDIA_MANAGER, payload: { open: true, onlyImages: onlyImages, onlyPDFs: onlyDocuments, onSelect: addFileToDropzone } });
    }

    function addFileToDropzone(file) {
        addFile([file], []);
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: accept, //{ 'application/pdf': ['.pdf', '.PDF'], 'application/msword': ['.doc', '.docx'], 'text/plain': ['.txt'], 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'] },
        maxFiles: 1,
        maxSize: MAX_FILE_SIZE,
        noClick: true,
        onDrop: (acceptedFiles, rejectedFiles) => {

            // convert all acceptedFiles in binary:
            const fileToUpload = new File([acceptedFiles[0]], acceptedFiles[0].name, { type: acceptedFiles[0].type });

            trackPromise(
                AttachmentService.create(fileToUpload)
                    .then(async (response) => {
                        const json = await response.json();
                        addFile(json?.content, rejectedFiles);
                    })
                    .catch((error) => {
                        console.log("error", error);
                    })
            );
        }
    });

    function addFile(acceptedFiles, rejectedFiles) {
        if (acceptedFiles.length > 0) {
            field.onChange(acceptedFiles[0]);
            replaceFile(acceptedFiles[0], label);
        }
        if (rejectedFiles.length > 0) {
            const errorMessages = [];
            for (const file of rejectedFiles) {
                let errorMessage;
                switch (file?.errors[0]?.code) {
                    case 'file-too-large':
                        errorMessage = t('files.errors.too-large', { fileName: file?.file?.name, maxSize: MAX_FILE_SIZE / ONE_MB });
                        break;
                    case 'file-invalid-type':
                        errorMessage = t('files.errors.wrong-type', { fileName: file?.file?.name, allowedTypes: onlyImages ? t('files.imageTypes') : onlyDocuments ? t('files.documentTypes') : t('files.allTypes') });
                        break;
                    default:
                        errorMessage = t('files.errors.generic', { fileName: file?.file?.name });
                        break;
                }
                errorMessages.push({ text: errorMessage, level: 'error' });
            }
            displayMessages(errorMessages);
        }
    }

    const customRemoveFile = () => {
        field.onChange(null);
        if (removeFile) {
            removeFile(label);
        }
    };

    return (
        <Box
            {...getRootProps({ onClick: openCustomFileDialog })}
            className={'relative flex flex-col items-center justify-center text-center border-2 border-dashed border-primary-main rounded-md p-2 cursor-pointer bg-primary-main/[.05] h-full ' + rest.rootClassName}
        >
            {label && <Typography variant="h6" sx={{ position: 'absolute', top: '-1.5rem', left: '1rem' }}>{label}</Typography>}
            <input {...getInputProps()} />
            <CloudUploadIcon style={{ fontSize: 40 }} color='primary' />
            {field.value ? (
                <>
                    <Box className='flex items-center justify-center w-full mt-2 overflow-hidden'>
                        <Typography variant="body2" className='truncate'>
                            {field.value.name ?? t('files.defaultDisplayedName', { label: label })}
                        </Typography>
                        <IconButton onClick={(e) => { e.preventDefault(); e.stopPropagation(); customRemoveFile(); }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {field.value.size && <Box className='flex items-center justify-center w-full mt-2 overflow-hidden'>
                        <Typography variant="body2">
                            ({Math.round(field.value.size / 1024)} KB)
                        </Typography>
                    </Box>}
                </>
            ) : (
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: t('files.inputPlaceholder') }}>
                </Typography>
            )}
        </Box>
    );
};

export default CustomFileInput;