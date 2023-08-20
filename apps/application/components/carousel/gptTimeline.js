
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import ShowIf from "../utils/showIf";
import timelineClasses from "./timeline.module.scss";

const mockItems = [
    {
        title: 'Event 1',
        description: 'Description for Event 1',
        date: '2023-08-19',
    },
    {
        title: 'Event 2',
        description: 'Description for Event 2',
        date: '2023-08-20',
    },
    {
        title: 'Event 3',
        description: 'Description for Event 3',
        date: '2023-08-21',
    },
    {
        title: 'Event 4',
        description: 'Description for Event 4',
        date: '2023-08-22',
    },
    // Add more mock items as needed
];

const TimelineCustom = () => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    return (
        <>

            <MiddleLine isFirstSkipped={true} isFirstLine={true} previewElements={[<PreviewElement />, <PreviewElement />, <PreviewElement />]} />

            <Grid container className="relative w-full h-full flex justify-center items-stretch" sx={{ height: '100%' }}  >
                <Grid item xs={12} lg={2.25} className={' relative flex justify-center items-center z-10'}>
                    <FirstElement />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2023} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center z-10'}>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                    </ShowIf>
                    <ColumnLine hasPreview />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2023} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={'relative flex flex-col justify-center items-center z-10'}>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                    </ShowIf>
                    <ColumnLine hasPreview />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2025} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-end z-10'}>
                    <ShowIf condition={isGreaterThanLg}>
                        <ConnectorLine IsTop={true} isRight={true} />
                    </ShowIf>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                        <ColumnLine hasPreview />
                    </ShowIf>
                </Grid>
            </Grid>

            <MiddleLine isFirstSkipped={false} isFirstLine={false} />

            <Grid container className="relative w-full h-full flex justify-center items-stretch" sx={{ height: '100%' }}  >
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center lg:flex-row lg:justify-end lg:items-end z-10'}>
                    <ConnectorLine IsTop={true} isRight={false} />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2021} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center z-10'}>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                    </ShowIf>
                    <ColumnLine hasPreview />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2022} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={'relative flex flex-col justify-center items-center z-10'}>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                    </ShowIf>
                    <ColumnLine hasPreview />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2024} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start z-10'}>
                    <ShowIf condition={isGreaterThanLg}>
                        <ConnectorLine IsTop={false} isRight={true} />
                    </ShowIf>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                        <ColumnLine hasPreview />
                    </ShowIf>
                </Grid>
            </Grid>

            <MiddleLine isFirstSkipped={true} isFirstLine={false} />

            <Grid container className="relative w-full h-full flex justify-center items-stretch" sx={{ height: '100%' }}  >
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center lg:flex-row lg:justify-end lg:items-start z-10'}>
                    <ConnectorLine IsTop={false} isRight={false} />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                    <Element text={2023} />
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex flex-col justify-center items-center z-10'}>
                    <ShowIf condition={isSmallerThanLg}>
                        <ColumnLine hasPreview />
                        <PreviewElement />
                    </ShowIf>
                    <LastElement />
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                </Grid>
                <Grid item xs={12} lg={2.25} className={'relative flex justify-center items-center z-10'}>
                </Grid>
                <Grid item xs={12} lg={1} className={' relative flex justify-center items-center z-10'}>
                </Grid>
                <Grid item xs={12} lg={2.25} className={' relative flex justify-start items-end z-10'}>
                </Grid>
            </Grid>
        </>
    );
};

export default TimelineCustom;


const FirstElement = () => {
    return (
        <Box className='flex justify-content items-center bg-white' sx={{ transform: { xs: 'rotate(90deg)', lg: 'rotate(0)' } }}>
            <img src="/images/arrow.png" alt='avatar' />
        </Box>
    )
}

const Element = ({ text }) => {
    return (
        <Avatar id="testa" variant='rounding' className={timelineClasses.circle + ' border-4 border-primary-main bg-white text-dark-main shadow-xl w-full h-auto'}>
            <Typography variant="h4">{text}</Typography>
        </Avatar>
    )
}

const LastElement = () => {
    return (
        <Box className='flex justify-content items-center bg-white' sx={{ transform: { xs: 'rotate(90deg)', lg: 'rotate(0)' } }}>
            <img src="/images/arrow.png" alt='avatar' />
        </Box>
    )
}

const ColumnLine = ({ hasPreview }) => {
    return (
        <Box className='h-full w-1 lg:h-1 lg:w-full bg-primary-main z-0 rounded-2xl'
            sx={{ minHeight: { xs: hasPreview ? '4em' : '10em', lg: '0' } }}
        />
    )
}

const RowLine = ({ isEnd }) => {
    return (
        <Box
            className='w-1/2 h-full'
            sx={({ palette }) => ({
                borderLeft: isEnd ? 'none' : `0.25rem solid ${palette.primary.main}`,
                borderRight: isEnd ? `0.25rem solid ${palette.primary.main}` : 'none',
                minHeight: '10em',
            })}
        />
    )
}

const ConnectorLine = ({ IsTop, isRight }) => {

    let borderRadiusClass = 'rounded-';

    if (IsTop) {
        borderRadiusClass += 't';
    } else {
        borderRadiusClass += 'b';
    }

    if (isRight) {
        borderRadiusClass += 'r';
    } else {
        borderRadiusClass += 'l';
    }

    borderRadiusClass += '-lg';

    return (
        <Box
            className={'hidden lg:block lg:w-1/2 lg:h-1/2 ' + borderRadiusClass}
            sx={({ palette }) => ({
                height: '10em',
                borderTop: IsTop ? `0.25rem solid ${palette.primary.main}` : 'none',
                borderBottom: IsTop ? 'none' : `0.25rem solid ${palette.primary.main}`,
                borderLeft: isRight ? 'none' : `0.25rem solid ${palette.primary.main}`,
                borderRight: isRight ? `0.25rem solid ${palette.primary.main}` : 'none',
            })}
        />
    )
}


const PreviewElement = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = (forceTo) => {
        setExpanded(forceTo !== undefined ? forceTo : !expanded);
    }

    return (
        <Box className='max-w-sm sm:w-96 lg:w-full bh-white shadow-lg rounded-lg m-2'>
            <Box className='w-full bh-white shadow-lg rounded-lg cursor-pointer' onClick={() => handleExpandClick()}>
                <Typography variant="h5" className='p-2' textAlign='center'>My first Experience</Typography>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" className='p-2'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
                    vestibulum sagittis, augue magna ultricies nunc, eu tincidunt quam quam id sem.
                </Typography>
                <Box className='w-full flex justify-between items-center mb-2'>
                    <Typography variant="caption" color='primary' className='ml-2 cursor-pointer'>Read All</Typography>
                    <Typography variant="caption" color='primary' className='mr-2 cursor-pointer' onClick={() => handleExpandClick(false)} >X</Typography>
                </Box>
            </Collapse>

        </Box>
    )
}


const MiddleLine = ({ isFirstSkipped, isFirstLine, previewElements }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    return (
        <>

            {/* isFirstSkipped = true */}
            {/* isFirstLine = true */}
            <Grid container className="relative w-full h-full flex justify-center items-stretch">
                <Grid item xs={12} lg={isFirstSkipped ? 2.25 : 3.25} className={(!isFirstLine && isFirstSkipped ? 'justify-start items-center' : 'justify-center items-end') + ' relative flex z-10'} sx={{ direction: !isFirstLine && isFirstSkipped ? 'rtl' : 'ltr' }}>
                    <ShowIf condition={!isFirstLine && isFirstSkipped && isGreaterThanLg}>
                        <RowLine isEnd={false} />
                    </ShowIf>
                    <ShowIf condition={!isFirstLine && !isFirstSkipped && isGreaterThanLg}>
                        {
                            previewElements?.slice(0, 1).map((previewElement, index) => <PreviewElement key={index} />)
                        }
                    </ShowIf>
                </Grid>
                <Grid item xs={12} lg={3.25} className={' relative flex justify-center items-end z-10'}>
                    <ShowIf condition={isGreaterThanLg}>
                        <PreviewElement />
                    </ShowIf>
                </Grid>
                <Grid item xs={12} lg={3.25} className={'relative flex justify-center items-end z-10'}>
                    <ShowIf condition={isGreaterThanLg}>
                        <PreviewElement />
                    </ShowIf>
                </Grid>
                <Grid item xs={12} lg={isFirstSkipped ? 3.25 : 2.25} className={(isFirstSkipped ? 'justify-center' : 'justify-start') + ' relative flex items-end z-10'}>
                    <ShowIf condition={isFirstSkipped && isGreaterThanLg}>
                        <PreviewElement />
                    </ShowIf>
                    <ShowIf condition={!isFirstSkipped && isGreaterThanLg}>
                        <RowLine isEnd={true} />
                    </ShowIf>
                </Grid>
            </Grid>

        </>
    )
}