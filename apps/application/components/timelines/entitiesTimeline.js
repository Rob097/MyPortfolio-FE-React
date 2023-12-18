import { useBreakpoints } from '@/hooks/useBreakpoints';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from "react";
import ShowIf from "../utils/showIf";
import timelineClasses from "./timeline.module.scss";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from "next/link";

const COOMING_SOON = 'Cooming Soon';
const SHOW_ARROW = true;

// Main component of the "S-shaped" timeline
const EntitiesTimeline = ({ entities }) => {
    const { t } = useTranslation('common');


    /* Decomment to hide timeline if there are less than 3 entitites:
    if (!stories || stories.length < 3) {
        return <h2 className='text-center'>{t('errors.no-data-found')}</h2>;
    }*/

    // Order the entities by fromDate ASC:
    useEffect(() => {
        entities.sort((a, b) => {
            if (a.fromDate && b.fromDate) {
                return new Date(a.fromDate) - new Date(b.fromDate);
            }
            return 0;
        });
    }, [entities]);

    // Display 3 elements per row:
    const rows = [];
    for (let i = 0; i < entities.length; i += 3) {
        rows.push(
            <Box key={"ROW-" + i}>
                <MiddleLine isFirstLine={i === 0} rowItems={entities.slice(i, i + 3)} isRowEven={i % 2 === 0} />
                <ElementsLine isFirst={i === 0} rowItems={entities.slice(i, i + 3)} isRowEven={i % 2 === 0} stories={entities} />
            </Box>
        );
    }

    // If the last item of stories is the last of a row, add a MiddleLine and a ElementsLine:
    if (entities.length % 3 === 0) {
        rows.push(
            <Box key={"ROW-" + entities.length}>
                <MiddleLine isFirstLine={false} rowItems={[]} isRowEven={rows.length % 2 === 0} />
                <ElementsLine isFirst={false} rowItems={[]} isRowEven={rows.length % 2 === 0} stories={entities} />
            </Box>
        );
    }

    return (
        <Box className={timelineClasses.customTimelineContainer + " w-full bg-background-main shadow-2xl rounded-lg"} /* minHeight={'30em'} */>
            <TimelineBackground />
            <Box id='timeline-content' className={timelineClasses.content + ' lg:p-4'}>
                <Box>
                    {rows}
                </Box>
            </Box>
        </Box>
    );
};

export default EntitiesTimeline;

const TimelineBackground = () => {

    const [topOpacity, setTopOpacity] = useState(0);
    const [bottomOpacity, setBottomOpacity] = useState(0);
    const backgroundImage = `linear-gradient(rgba(34, 34, 34, ${topOpacity}), transparent 12.5%, transparent 87.5%, rgba(34, 34, 34, ${bottomOpacity}))`;

    useEffect(() => {
        const timelineContent = document.getElementById('timeline-content');
        const maxOpacity = 0.2;
        let fraction = timelineContent.firstChild.offsetHeight / 2;

        function updateOpacity() {
            let scrollTop = timelineContent.scrollTop;
            const topOpacity = scrollTop / fraction > maxOpacity ? maxOpacity : scrollTop / fraction;
            const bottomOpacity = 1 - scrollTop / fraction > maxOpacity ? maxOpacity : 1 - scrollTop / fraction;
            setTopOpacity(topOpacity);
            setBottomOpacity(bottomOpacity);
        }

        updateOpacity();

        timelineContent.addEventListener("scroll", function () {
            updateOpacity();
        });

        timelineContent.addEventListener("resize", function () {
            fraction = timelineContent.firstChild.offsetHeight / 2;
        });

    }, []);

    return (
        <Box className={timelineClasses.background} style={{ backgroundImage: backgroundImage }}></Box>
    )
}

// Represents a single element of the timeline (the circle with the year or the "Cooming Soon" text)
const Element = ({ text, showArrow, isRowEven }) => {
    const { isSmallerThan } = useBreakpoints();
    const isSmallerThanLg = isSmallerThan('lg');

    const isCoomingSoon = text === COOMING_SOON;
    let transform = 'translateX(-30px)';
    if (!isRowEven) {
        transform = 'translateX(30px) rotate(180deg)';
    }
    if (isSmallerThanLg) {
        transform = 'translate(-50%, -65px) rotate(90deg)';
    }

    return (
        <>
            <ShowIf condition={SHOW_ARROW && showArrow && isRowEven}>
                <ArrowForwardIosIcon color='primary' fontSize='large' className='z-10 absolute left-1/2 lg:left-0'
                    sx={{ transform: transform }}
                />
            </ShowIf>
            <Avatar variant='rounding' className={timelineClasses.circle + ' border-4 border-primary-main bg-white text-dark-main shadow-xl w-full h-auto m-2 lg:m-2'}>
                <Typography variant="h4" textAlign='center' fontSize={isCoomingSoon && '0.8rem !important'} lineHeight={isCoomingSoon && '1rem !important'} className='lg:text-base xl:text-md' >{text}</Typography>
            </Avatar>
            <ShowIf condition={SHOW_ARROW && showArrow && !isRowEven}>
                <ArrowForwardIosIcon color='primary' fontSize='large' className='z-10 absolute left-1/2 lg:right-0 lg:left-auto'
                    sx={{ transform: transform }}
                />
            </ShowIf>
        </>
    )
}

// Represents the arrow at the start and at the end of the timeline
const ArrowElement = ({ isFirst, isRowEven }) => {
    return (
        <Box className={(isFirst ? 'lg:justify-end' : 'lg:justify-start') + ' w-full h-full flex justify-center items-center'}>
            <Box className='flex justify-content items-center' sx={{ transform: { xs: 'rotate(90deg)', lg: isRowEven ? 'rotate(0)' : 'rotate(180deg)' } }}>
                <img src="/images/arrow.png" alt='avatar' />
            </Box>
        </Box>
    )
}

// Represents the line between two elements of the timeline
// type: 'column' | 'row' | 'connector'
const Line = ({ type, hasPreview, isEnd, isTop, isRight }) => {

    const lineHeightN = 0.5;
    const lineHeightU = 'rem';
    const lineWidth = '0.25rem';

    if (type === 'column') {
        return (
            <Box className='bg-primary-main z-0 rounded-2xl lg:px-4'
                sx={{
                    minHeight: { xs: hasPreview ? '4em' : '10em', lg: '0' },
                    width: { xs: lineWidth, lg: '100%' },
                    height: { xs: '100%', lg: lineHeightN + lineHeightU },
                }}
            />
        );
    }

    if (type === 'row') {
        return (
            <Box
                className='w-1/2 h-full'
                sx={({ palette }) => ({
                    borderLeft: isEnd ? 'none' : `${lineHeightN + lineHeightU} solid ${palette.primary.main}`,
                    borderRight: isEnd ? `${lineHeightN + lineHeightU} solid ${palette.primary.main}` : 'none',
                    minHeight: '10em',
                })}
            />
        );
    }

    if (type === 'connector') {
        let borderRadiusClass;

        if (isTop && isRight) {
            borderRadiusClass = 'rounded-tr-lg';
        } else if (isTop && !isRight) {
            borderRadiusClass = 'rounded-tl-lg';
        } else if (!isTop && isRight) {
            borderRadiusClass = 'rounded-br-lg';
        } else if (!isTop && !isRight) {
            borderRadiusClass = 'rounded-bl-lg';
        }

        return (
            <Box
                className={'hidden lg:block lg:w-1/2 ' + borderRadiusClass}
                sx={({ palette }) => {
                    const borderStyle = `${lineHeightN + lineHeightU} solid ${palette.primary.main}`;
                    return ({
                        height: `calc(50% + ${lineHeightN / 2}${lineHeightU})`,
                        borderTop: isTop ? borderStyle : 'none',
                        borderBottom: isTop ? 'none' : borderStyle,
                        borderLeft: isRight ? 'none' : borderStyle,
                        borderRight: isRight ? borderStyle : 'none',
                    })
                }}
            />
        );
    }

    return null;
};


// Represents the description of a story with title, description text and a "Read All" button
const PreviewElement = ({ entity, title, description }) => {
    const { t } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);

    const router = useRouter();
    const { userSlug, entityType } = router.query;

    const handleExpandClick = (forceTo) => {
        setExpanded(forceTo !== undefined ? forceTo : !expanded);
    }

    return (
        <Box className='max-w-sm sm:w-96 lg:w-full bg-white shadow-lg rounded-lg m-2' sx={{ direction: 'ltr' }} >
            <Box className='w-full shadow-lg rounded-lg cursor-pointer' onClick={() => handleExpandClick()}>
                <Typography variant="h3" className='p-2 text-base' textAlign='center'>{title}</Typography>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" className='m-2 overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical" }}>
                    {description}
                </Typography>
                <Box className='w-full flex justify-between items-center mb-2'>
                    <Link href='/users/[userSlug]/diary/[entityType]/[entitySlug]#mainEntityStory' as={`/users/${userSlug}/diary/${entityType}/${entity?.slug}#mainEntityStory`}>
                        <Typography variant="caption" color='primary' className='ml-2 cursor-pointer'>{t('read-more')}</Typography>
                    </Link>
                    <Typography variant="caption" color='primary' className='mr-2 cursor-pointer' onClick={() => handleExpandClick(false)} >X</Typography>
                </Box>
            </Collapse>

        </Box>
    )
}

// If screen is less than LG, represents a single line of the timeline (the one with the 3 descriptionElements plus the row lines)
// If the row is not even, the direction of the row is reversed
const MiddleLine = ({ isFirstLine, rowItems, isRowEven }) => {
    const { isGreaterThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');

    return (
        <>

            <Grid container className="relative w-full h-full flex justify-center items-stretch" sx={{ direction: !isRowEven ? 'rtl' : 'ltr' }}>

                <Grid item xs={12} lg={2.25} className='relative flex justify-end items-center z-10'>
                    <ShowIf condition={!isFirstLine && isGreaterThanLg}>
                        <Line type="row" isEnd={!isRowEven} />
                    </ShowIf>
                </Grid>

                {
                    // for loop from 0 to 2 through rowItems array:
                    [...Array(3).keys()].map((index) => (
                        <Grid item key={"middle-line-" + index} xs={12} lg={3.25} className='relative flex justify-center items-end z-10'>
                            <ShowIf condition={isGreaterThanLg}>
                                <ShowIf condition={rowItems[index] !== undefined}>
                                    <PreviewElement entity={rowItems[index]} title={rowItems[index]?.title || rowItems[index]?.field} description={rowItems[index]?.description} key={'description-' + rowItems[index]?.id} />
                                </ShowIf>
                            </ShowIf>
                        </Grid>
                    ))
                }

            </Grid>

        </>
    )
}

// Represents a single line of the timeline (the one with the 3 elements plus the column and connector lines)
const ElementsLine = ({ isFirst, rowItems, isRowEven, stories }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const isCoomingSoon = rowItems.length === 0;
    const isAbsoluteLast = !isCoomingSoon && rowItems[rowItems.length - 1]?.id === stories[stories.length - 1]?.id ? rowItems.length - 1 : -1;

    const ColumnLine = ({ index }) => (
        <Grid item xs={12} lg={2.25} className={'relative flex flex-col justify-center items-center z-10 lg:px-2'}>
            <ShowIf condition={!isCoomingSoon && isSmallerThanLg && (isAbsoluteLast === -1 || isAbsoluteLast >= index)}>
                <Line type="column" hasPreview />
                <PreviewElement entity={rowItems[index]} title={rowItems[index]?.title || rowItems[index]?.field} description={rowItems[index]?.description} key={rowItems[index]?.id} />
            </ShowIf>

            <ShowIf condition={(isCoomingSoon && index === 0) || isAbsoluteLast === index}>
                <ArrowElement isRowEven={isRowEven} />
            </ShowIf>

            <ShowIf condition={!isCoomingSoon && (isAbsoluteLast === -1 || isAbsoluteLast > index)}>
                <Line type="column" hasPreview />
            </ShowIf>
        </Grid>
    );

    function getDate(item) {
        return item?.fromDate ? (new Date(item?.fromDate)?.getMonth() + 1 + "/" + new Date(item?.fromDate)?.getFullYear()) : ('🚀');
    }

    const SimpleElement = ({ index, isRowEven }) => (

        <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
            <ShowIf condition={!isCoomingSoon && (isAbsoluteLast === -1 || isAbsoluteLast > index - 1)}>
                <Element text={getDate(rowItems[index])} showArrow={true} isRowEven={isRowEven} />
            </ShowIf>
        </Grid>

    );

    return (
        <>

            <Grid container className="relative w-full h-full flex justify-center items-stretch" sx={{ height: '100%', direction: !isRowEven && isGreaterThanLg ? 'rtl' : 'ltr' }}  >

                <Grid item xs={12} lg={2.25} className="relative flex flex-col justify-center items-center lg:flex-row lg:justify-end lg:items-start z-10 lg:px-2">
                    <ShowIf condition={isFirst}>
                        <ArrowElement isRowEven={isRowEven} isFirst />
                    </ShowIf>
                    <ShowIf condition={!isFirst}>
                        <Line type="connector" isTop={false} isRight={!isRowEven} />
                    </ShowIf>
                </Grid>


                <Grid item xs={12} lg={1} className={' relative flex flex-col lg:flex-row justify-center items-center z-10'}>

                    <ShowIf condition={isCoomingSoon}>
                        <Element text={COOMING_SOON} showArrow={true} isRowEven={isRowEven} />
                        {/* <ArrowElement isRowEven={isRowEven} /> */}
                    </ShowIf>
                    <ShowIf condition={!isCoomingSoon}>
                        <Element text={getDate(rowItems[0])} showArrow={!isFirst} isRowEven={isRowEven} />
                    </ShowIf>
                </Grid>

                <ColumnLine index={0} />

                <SimpleElement index={1} isRowEven={isRowEven} />

                <ColumnLine index={1} />

                <SimpleElement index={2} isRowEven={isRowEven} />

                <Grid item xs={12} lg={2.25} className="relative flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-end z-10 lg:px-2">
                    <ShowIf condition={!isCoomingSoon && (isAbsoluteLast === -1 || isAbsoluteLast === 2)}>
                        <ShowIf condition={isGreaterThanLg}>
                            <Line type="connector" isTop={true} isRight={isRowEven} />
                        </ShowIf>
                        <ShowIf condition={isSmallerThanLg}>
                            <Line type="column" hasPreview />
                            <PreviewElement entity={rowItems[2]} title={rowItems[2]?.title || rowItems[2]?.field} description={rowItems[2]?.description} key={rowItems[2]?.id} />
                            <Line type="column" hasPreview />
                        </ShowIf>
                    </ShowIf>
                </Grid>

            </Grid>

        </>
    )
}