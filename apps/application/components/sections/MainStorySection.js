import HtmlContent from '@/components/utils/htmlContent';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import userClasses from '@/pages/users/[userSlug]/styles/shared.module.scss';
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { usePromiseTracker } from 'react-promise-tracker';
import ConditionalWrapper from '../utils/conditionalWrapper';
import Loading from "../utils/loading/loading";

const MainStorySection = ({ useContainer, mainStory }) => {
    const { t } = useTranslation(['user-home', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');

    // Tracker attività API
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            <Box className='absolute w-full h-96 left-0'>
                <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl bg-dark-main' style={{ opacity: 0.9 }} ></div>
            </Box>
            <ConditionalWrapper condition={useContainer} wrapper={children => <Container className={(isGreaterThanLg ? whiteBarClasses.customContainer : '')}>{children}</Container>}>
                <Box className='flex justify-center items-center h-96' sx={{ height: { xs: '22em', md: 'fit-content' } }}>
                    <Box className={userClasses.test + ' relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pt-4 md:py-6 px-2 sm:px-8 md:px-16'} sx={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                        </Box>
                        <Typography variant="h5" fontWeight="bold" color="primary">{t('user-home:about-me.title')}</Typography>
                        <div className={userClasses.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar mt-4 text-justify md:text-left'}>
                            <ShowIf condition={mainStory?.description !== undefined && mainStory?.description !== ''}>
                                <HtmlContent>
                                    {mainStory?.description}
                                </HtmlContent>
                            </ShowIf>
                            {promiseInProgress && <Loading adaptToComponent />}
                        </div>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                        </Box>
                    </Box>
                </Box>
            </ConditionalWrapper>
        </>
    );

}

export default MainStorySection;