import SectionCard from '@/components/cards/sectionCard';
import HtmlContent from '@/components/utils/htmlContent';
import { Box } from '@mui/material';

const RelevantSections = ({ section, isMobile }) => (
    <Box>
        {
            section?.relevantSections?.map((sectionTmp) => (
                <SectionCard key={sectionTmp.title} title={sectionTmp.title} className='my-6 overflow-y-hidden' style={{ height: isMobile ? 'auto' : `calc((100vh - 145px)/${section.relevantSections.length})`, maxHeight: isMobile ? '75vh' : '' }}>
                    <HtmlContent>
                        {sectionTmp.text}
                    </HtmlContent>
                </SectionCard>
            ))
        }
    </Box>
);

export default RelevantSections;