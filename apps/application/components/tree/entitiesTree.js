import { useBreakpoints } from '@/hooks/useBreakpoints';
import { EntityTypeEnum } from '@/models/categories.model';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const domSection = '#mainEntityStory';

const EntitiesTree = (props) => {
    const { t } = useTranslation(['user-diary']);
    const router = useRouter();
    const { entityType } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');

    const sectionTitle = useMemo(() => {
        switch (entityType) {
            case EntityTypeEnum.PROJECTS:
                return t('categories.list.my-projects');
            case EntityTypeEnum.EDUCATIONS:
                return t('categories.list.my-educations');
            case EntityTypeEnum.EXPERIENCES:
                return t('categories.list.my-experiences');
            default:
                return '';
        }
    }, [entityType]);

    return (
        <Box className='h-fit sticky md:top-32 !p-6 md:mt-16 md:bg-white md:rounded-xl md:shadow-xl'>
            <Typography variant="h4" component="div" fontWeight='bold' textAlign={isGreaterThanMd ? 'right' : 'left'} className='mb-4'>{sectionTitle}</Typography>
            <EntitiesTreeContent {...props} />
        </Box>
    );
}

export const EntitiesTreeContent = ({ entity, entities, category }) => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(['p-' + entity?.id]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    useEffect(() => {
        setExpanded(['p-' + entity?.id]);
    }, [entity?.id]);

    function handleClick(entityId, storyId) {
        const entitySlug = entities.find((entity) => entity?.id === entityId)?.slug;
        const storySlug = entities.find((entity) => entity?.id === entityId)?.stories?.find((story) => story.id === storyId)?.slug;

        if (storySlug)
            router.push(`/users/${router.query.userSlug}/diary/${category}/${entitySlug}/${storySlug}${domSection}`, undefined, { shallow: true });
        else
            router.push(`/users/${router.query.userSlug}/diary/${category}/${entitySlug}${domSection}`);
    }

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            selected={'p-' + entity?.id}
            expanded={expanded}
            onNodeToggle={handleToggle}
            className='h-full'
        >
            {/* For each entity of entities create a TreeItem. For each story of each entity create a child TreeItem: */}
            {entities?.map((entity) => (
                <TreeItem
                    key={'p-' + entity?.id}
                    nodeId={'p-' + entity?.id}
                    label={
                        <div onClick={event => event.stopPropagation()}>
                            <div onClick={() => handleClick(entity?.id, undefined)}>{entity?.title || entity?.field}</div>
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
                    {entity?.stories?.map((story) => (
                        <TreeItem
                            key={'s-' + story.id}
                            nodeId={'s-' + story.id}
                            label={
                                <div onClick={event => event.stopPropagation()}>
                                    <div onClick={() => handleClick(entity?.id, story.id)}>{story.title}</div>
                                </div>}
                            className='py-1'
                        />
                    ))}
                </TreeItem>
            ))}
        </TreeView>
    );
}

export default EntitiesTree;