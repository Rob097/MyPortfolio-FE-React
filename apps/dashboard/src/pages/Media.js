import PdfThumbnail from "@/components/Custom/PdfThumbnail";
import MediaManager from "@/components/MediaManager";
import { Box, Button } from '@mui/material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from "react";


const Media = (props) => {
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    return (
        <>
            <Box className="flex flex-col w-full h-full">
                <h1>Media</h1>

                <Button onClick={() => setShowMediaModal(true)}>Open Media Manager</Button>
                {selectedFile && selectedFile?.type?.includes('image') && <img src={selectedFile?.url} className="object-contain h-96" />}
                {selectedFile && selectedFile?.type?.includes('pdf') && <PdfThumbnail file={selectedFile} />}
            </Box>

            <MediaManager show={showMediaModal} close={() => setShowMediaModal(false)} onSelect={(file) => setSelectedFile(file)} />
        </>
    );
}

export default Media;