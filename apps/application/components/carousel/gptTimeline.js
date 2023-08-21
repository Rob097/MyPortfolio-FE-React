import { experienceStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import ShowIf from "../utils/showIf";
import timelineClasses from "./timeline.module.scss";

const COOMING_SOON = 'Cooming Soon';
const SHOW_ARROW = true;

// Main component of the "S-shaped" timeline
const TimelineCustom = () => {

    if (!experienceStories || experienceStories.length < 3) {
        return <h2 className='text-center'>Nessun dato trovato</h2>;
    }

    // Display 3 elements per row:
    const rows = [];
    for (let i = 0; i < experienceStories.length; i += 3) {
        rows.push(
            <Box key={"ROW-" + i}>
                <MiddleLine isFirstLine={i === 0} rowItems={experienceStories.slice(i, i + 3)} isRowEven={i % 2 === 0} />
                <ElementsLine isFirst={i === 0} rowItems={experienceStories.slice(i, i + 3)} isRowEven={i % 2 === 0} />
            </Box>
        );
    }

    // If the last item of experienceStories is the last of a row, add a MiddleLine and a ElementsLine:
    if (experienceStories.length % 3 === 0) {
        rows.push(
            <Box key={"ROW-" + experienceStories.length}>
                <MiddleLine isFirstLine={false} rowItems={[]} isRowEven={rows.length % 2 === 0} />
                <ElementsLine isFirst={false} rowItems={[]} isRowEven={rows.length % 2 === 0} />
            </Box>
        );
    }

    return (
        <Box className={timelineClasses.customTimelineContainer + " w-full mt-20 bg-white shadow-xl rounded-lg"} /* minHeight={'30em'} */>
            <Box className={timelineClasses.background}></Box>
            <Box className={timelineClasses.content}>
                {rows}
            </Box>
        </Box>
    );
};

export default TimelineCustom;


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
                <Typography variant="h4" textAlign='center' fontSize={isCoomingSoon && '0.8rem'} lineHeight={isCoomingSoon && '1rem'}>{text}</Typography>
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


// Represents the preview of a story with title, preview text and a "Read All" button
const PreviewElement = ({ title, preview }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = (forceTo) => {
        setExpanded(forceTo !== undefined ? forceTo : !expanded);
    }

    return (
        <Box className='max-w-sm sm:w-96 lg:w-full bh-white shadow-lg rounded-lg m-2' sx={{ direction: 'ltr' }} >
            <Box className='w-full bh-white shadow-lg rounded-lg cursor-pointer' onClick={() => handleExpandClick()}>
                <Typography variant="h5" className='p-2' textAlign='center'>{title}</Typography>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" className='m-2 overflow-hidden text-ellipsis' sx={{ display: "-webkit-box", WebkitLineClamp: "5", WebkitBoxOrient: "vertical" }}>
                    {preview}
                </Typography>
                <Box className='w-full flex justify-between items-center mb-2'>
                    <Typography variant="caption" color='primary' className='ml-2 cursor-pointer'>Read All</Typography>
                    <Typography variant="caption" color='primary' className='mr-2 cursor-pointer' onClick={() => handleExpandClick(false)} >X</Typography>
                </Box>
            </Collapse>

        </Box>
    )
}

// If screen is less than LG, represents a single line of the timeline (the one with the 3 previewElements plus the row lines)
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
                        <Grid item xs={12} lg={3.25} className='relative flex justify-center items-end z-10'>
                            <ShowIf condition={isGreaterThanLg}>
                                <ShowIf condition={rowItems[index] !== undefined}>
                                    <PreviewElement title={rowItems[index]?.title} preview={rowItems[index]?.preview} key={'preview-' + rowItems[index]?.id} />
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
const ElementsLine = ({ isFirst, rowItems, isRowEven }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const isCoomingSoon = rowItems.length === 0;
    const isAbsoluteLast = !isCoomingSoon && rowItems[rowItems.length - 1]?.id === experienceStories[experienceStories.length - 1]?.id ? rowItems.length - 1 : -1;

    const ColumnLine = ({ index }) => (
        <Grid item xs={12} lg={2.25} className={'relative flex flex-col justify-center items-center z-10 lg:px-2'}>
            {/* <ShowIf condition={!isCoomingSoon}> */}

            <ShowIf condition={!isCoomingSoon && isSmallerThanLg && (isAbsoluteLast === -1 || isAbsoluteLast >= index)}>
                <Line type="column" hasPreview />
                <PreviewElement title={rowItems[index]?.title} preview={rowItems[index]?.preview} key={rowItems[index]?.id} />
            </ShowIf>

            <ShowIf condition={(isCoomingSoon && index === 0) || isAbsoluteLast === index}>
                <ArrowElement isRowEven={isRowEven} />
            </ShowIf>

            <ShowIf condition={!isCoomingSoon && (isAbsoluteLast === -1 || isAbsoluteLast > index)}>
                <Line type="column" hasPreview />
            </ShowIf>

            {/* </ShowIf> */}
        </Grid>
    );

    const SimpleElement = ({ index, isRowEven }) => (

        <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
            <ShowIf condition={!isCoomingSoon && (isAbsoluteLast === -1 || isAbsoluteLast > index - 1)}>
                <Element text={rowItems[index]?.year} showArrow={true} isRowEven={isRowEven} />
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
                        <Element text={rowItems[0]?.year} showArrow={!isFirst} isRowEven={isRowEven} />
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
                            <PreviewElement title={rowItems[2]?.title} preview={rowItems[2]?.preview} key={rowItems[2]?.id} />
                            <Line type="column" hasPreview />
                        </ShowIf>
                    </ShowIf>
                </Grid>

            </Grid>

        </>
    )
}