import { pageThumbnailPlugin } from '@/components/MediaManager/pageThumbnailPlugin';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

const PdfThumbnail = ({ file }) => {
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Cover } = thumbnailPluginInstance;
    const pageThumbnailPluginInstance = pageThumbnailPlugin({
        PageThumbnail: <Cover getPageIndex={() => 0} width={581} />,
    });

    return (
        <Viewer fileUrl={file.url} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} className="w-full h-full" />
    );
};

export default PdfThumbnail;