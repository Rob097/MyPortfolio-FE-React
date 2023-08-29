import { projectStories } from '@/data/mock/stories';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const domSection = '#mainProjectSection';

const ProjectsTree = ({ project }) => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(['p-' + project.id]);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    useEffect(() => {
        setExpanded(['p-' + project.id]);
    }, [router.query.projectName]);

    function handleClick(projectId, sectionId) {
        const projectSlug = projectStories.find((project) => project.id === projectId)?.slug;
        const sectionSlug = projectStories.find((project) => project.id === projectId)?.sections?.find((section) => section.id === sectionId)?.slug;

        if (sectionSlug)
            router.push(`/users/${router.query.userId}/diary/projects/${projectSlug}/${sectionSlug}${domSection}`, undefined, { shallow: true });
        else
            router.push(`/users/${router.query.userId}/diary/projects/${projectSlug}${domSection}`);
    }

    return (
        <Box className='h-fit sticky md:top-32 !px-6 !pt-6 md:mt-16 md:bg-white md:rounded-xl md:shadow-xl'>
            <Typography variant="h4" component="div" fontWeight='bold' textAlign={isGreaterThanMd ? 'right' : 'left'} className='mb-4'>My Projects</Typography>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                selected={'p-' + project.id}
                expanded={expanded}
                onNodeToggle={handleToggle}
                className='h-full'
            >
                {/* For each project of projectStories create a TreeItem. For each section of each project create a child TreeItem: */}
                {projectStories.map((project) => (
                    <TreeItem
                        key={'p-' + project.id}
                        nodeId={'p-' + project.id}
                        label={
                            <div onClick={event => event.stopPropagation()}>
                                <div onClick={() => handleClick(project.id, undefined)}>{project.title}</div>
                            </div>
                        }
                        className='py-1'
                        sx={({ rounded }) => ({
                            ['& .MuiTreeItem-content']: {
                                height: '3rem',
                                borderRadius: rounded.xl
                            }
                        })}
                    >
                        {project.sections?.map((section) => (
                            <TreeItem
                                key={'s-' + section.id}
                                nodeId={'s-' + section.id}
                                label={
                                    <div onClick={event => event.stopPropagation()}>
                                        <div onClick={() => handleClick(project.id, section.id)}>{section.title}</div>
                                    </div>}
                                className='py-1'
                            />
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </Box>
    );
}

export default ProjectsTree;