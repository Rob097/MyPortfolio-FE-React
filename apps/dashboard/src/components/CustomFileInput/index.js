import { displayMessages } from '@/components/alerts';
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { MAX_FILE_SIZE } from "shared/utilities/constants";

const ONE_MB = 1024 * 1024;
const CustomFileInput = ({ field, label, replaceFile, removeFile }) => {
    const { t } = useTranslation("dashboard");

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': ['.pdf', '.PDF'], 'application/msword': ['.doc', '.docx'], 'text/plain': ['.txt'], 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'] },
        maxFiles: 1,
        maxSize: MAX_FILE_SIZE,
        onDrop: (acceptedFiles, rejectedFiles) => {
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
                            errorMessage = t('files.errors.wrong-type', { fileName: file?.file?.name });
                            break;
                        default:
                            errorMessage = t('files.errors.generic', { fileName: file?.file?.name });
                            break;
                    }
                    errorMessages.push({ text: tooLargeError, level: 'error' });
                }
                displayMessages(errorMessages);
            }
        }
    });

    const customRemoveFile = () => {
        field.onChange(null);
        removeFile(label);
    };

    return (
        <Box
            {...getRootProps()}
            className='relative flex flex-col items-center justify-center text-center border border-dashed border-gray-500 rounded-md p-2 cursor-pointer bg-background-main h-full'
        >
            {label && <Typography variant="h6" sx={{ position: 'absolute', top: '-1.5rem', left: '1rem' }}>{label}</Typography>}
            <input {...getInputProps()} />
            <CloudUploadIcon style={{ fontSize: 40 }} />
            {field.value ? (
                <>
                    <Box className='flex items-center justify-center w-full mt-2 overflow-hidden'>
                        <Typography variant="body2" className='truncate'>
                            {field.value.name ?? t('files.defaultDisplayedName', { label: label })}
                        </Typography>
                        <IconButton onClick={customRemoveFile}>
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