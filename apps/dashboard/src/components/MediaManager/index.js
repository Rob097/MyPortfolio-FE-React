import { AttachmentQ } from '@/models/attachment.model';
import { AttachmentService } from '@/services/attachment.service';
import { Check, Close, Contacts, Delete, Image, PictureAsPdf, UploadFile } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { MAX_FILE_SIZE } from "shared/utilities/constants";
import { Sort, View } from 'shared/utilities/criteria';
import PdfThumbnail from '../Custom/PdfThumbnail';
import { displayMessages } from '../alerts';

const ONE_MB = 1024 * 1024;
const MediaManager = (props) => {
    const { allowSelect = true, show, close } = props;
    const [store, dispatch] = useDashboardStore();
    const { t, i18n } = useTranslation("dashboard");
    const [mode, setMode] = useState('all');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    const handleChangeMode = (mode) => {
        setMode(mode);
    };

    const handleSelectFile = (file) => {
        if (selectedFile?.id === file.id) {
            setSelectedFile(null);
        } else {
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        trackPromise(
            refreshFiles()
        );
    }, []);

    function refreshFiles() {
        const filters = new AttachmentQ(null, View.normal, 0, 50, new Sort(AttachmentQ.createdAt, 'DESC'));
        return AttachmentService.getByCriteria(filters)
            .then(response => setFiles(response?.content))
            .catch(error => console.error(error));
    }

    const isDisplayable = useCallback((file) => {
        return file && file.type && ((mode === 'all') || (file.type.includes('image') && mode === 'images') || (!file.type.includes('image') && mode === 'pdfs'));
    }, [mode]);

    function handleSelect() {
        props.onSelect(selectedFile);
        setSelectedFile(null);
        close();
    }

    function handleAddFile() {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'files';
        fileInput.accept = 'image/*, application/pdf';
        fileInput.click();
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length === 0) return;
            if (e.target.files[0].size > MAX_FILE_SIZE) {
                displayMessages([{ text: t('files.errors.too-large', { fileName: e.target.files[0].name, maxSize: MAX_FILE_SIZE / ONE_MB }), level: 'error' }]);
                return;
            }
            if (!e.target.files[0].type.includes('image') && !e.target.files[0].type.includes('pdf')) {
                displayMessages([{ text: t('files.errors.wrong-type', { fileName: e.target.files[0].name, allowedTypes: t('files.imagesPdf') }), level: 'error' }]);
                return;
            }

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                trackPromise(
                    AttachmentService.create(file)
                        .then(async response => {
                            const responseBody = await response.json();
                            refreshFiles();
                            handleSelectFile(responseBody?.content[0]);
                        })
                        .catch(error => console.error(error))
                );
            }

            reader.readAsDataURL(file);
        });
    }

    function handleDeleteFile() {
        if (!selectedFile) {
            return;
        }

        trackPromise(
            AttachmentService.delete(selectedFile.id)
                .then(() => {
                    refreshFiles();
                    setSelectedFile(null);
                })
                .catch(error => console.error(error))
        );
    }

    return (
        <Dialog
            open={show}
            onClose={close}
            fullWidth={true}
            maxWidth="xl"
            classes={{ paper: 'h-full' }}
        >
            <DialogTitle variant='h2'>Manage your files</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={close}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
            <DialogContent
                style={{ overflow: "hidden" }}
            >
                <Box className="w-full h-fit flex flex-col sm:flex-row justify-between items-center px-4 mb-4">

                    <Box className="relative flex border-b-2 border-transparent gap-x-2">
                        <Button
                            variant='text'
                            className='!w-1/3 !font-semibold'
                            color={mode === 'all' ? 'primary' : 'inherit'}
                            onClick={() => handleChangeMode('all')}
                            startIcon={<Contacts />}
                        >
                            All
                        </Button>
                        <Button
                            variant='text'
                            className='!w-1/3 !font-semibold'
                            color={mode === 'images' ? 'primary' : 'inherit'}
                            onClick={() => handleChangeMode('images')}
                            startIcon={<Image />}
                        >
                            Images
                        </Button>
                        <Button
                            variant='text'
                            className='!w-1/3 !font-semibold'
                            color={mode === 'pdfs' ? 'primary' : 'inherit'}
                            onClick={() => handleChangeMode('pdfs')}
                            startIcon={<PictureAsPdf />}
                        >
                            PDFs
                        </Button>
                        <div
                            className={`absolute bottom-0 h-1 bg-primary-main transition-all duration-300 w-1/3 
                                ${mode === 'all' ? 'left-0' : ''} 
                                ${mode === 'images' ? 'left-1/3' : ''} 
                                ${mode === 'pdfs' ? 'left-2/3' : ''}`}
                        />
                    </Box>

                    <Box className="w-fit h-fit flex flex-row justify-start items-center mt-4 sm:mt-0">
                        <Button variant="contained" color="primary" startIcon={<UploadFile />} onClick={handleAddFile}>Upload new File</Button>
                    </Box>
                </Box>

                <Box className="w-full h-full px-4 my-2 overflow-y-auto" sx={{ maxHeight: '35rem' }}>
                    <Grid container spacing={2}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            {files.map((file) => (
                                <Grid item key={file.id} xs={12} sm={6} md={4} lg={3} style={{ display: isDisplayable(file) ? 'block' : 'none' }}>
                                    <Box className="relative w-full" style={{ paddingBottom: '50%' }}>
                                        <Box onClick={() => handleSelectFile(file)} className={"absolute w-full h-full overflow-hidden rounded-md duration-300 hover:shadow-xl hover:cursor-pointer " + (selectedFile?.id === file.id ? 'border-4 border-primary-main' : 'border')}>
                                            {file.type.includes('image') ? (
                                                <img src={file.url} alt={file.url} className="w-full h-full object-contain" />
                                            ) : (
                                                <PdfThumbnail file={file} />
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Worker>
                    </Grid>

                </Box>
            </DialogContent>
            <DialogActions>
                <Box className="w-full h-fit flex flex-row justify-center sm:justify-between items-center px-4 mb-4">
                    <span></span>
                    <Box className="w-fit h-fit flex flex-row justify-start items-center gap-x-2">
                        <Button onClick={handleDeleteFile} variant="contained" color="error" startIcon={<Delete />} disabled={!selectedFile} >Delete</Button>
                        {allowSelect && <Button onClick={handleSelect} variant="contained" color="primary" startIcon={<Check />} disabled={!selectedFile} >Select</Button>}
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default MediaManager;