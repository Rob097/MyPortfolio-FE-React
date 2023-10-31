import Snack from "@/components/alerts/snack";
import HtmlContent from '@/components/utils/htmlContent';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { View } from '@/models/criteria.model';
import userClasses from '@/pages/users/[userSlug]/styles/shared.module.scss';
import StoryService from '@/services/story.service';
import UserService from '@/services/user.service';
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import ConditionalWrapper from '../utils/conditionalWrapper';
import Loading from "../utils/loading/loading";

const MainStorySection = ({ useContainer, staticMainStory }) => {
    const { t } = useTranslation(['user-home', 'common']);
    const router = useRouter();
    const { userSlug } = router.query;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');

    const [mainStory, setMainStory] = useState(staticMainStory);
    useEffect(() => {
        if (!staticMainStory) {
            trackPromise(
                UserService.getBySlug(userSlug, View.normal)
                    .then(user => {
                        if (user?.content?.mainStoryId) {
                            trackPromise(
                                StoryService.getById(user?.content?.mainStoryId, View.normal).then(story => {
                                    setMainStory(story?.content);
                                }).catch(error => {
                                    Snack.error(error);
                                })
                            );
                        }
                    })
                    .catch(error => {
                        Snack.error(error);
                    })
            );
        }
    }, [userSlug]);

    // Tracker attività API
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            <Box className='absolute w-full h-96 left-0'>
                <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl bg-dark-main' style={{ opacity: 0.9 }} ></div>
            </Box>
            <ConditionalWrapper condition={useContainer} wrapper={children => <Container className={(isGreaterThanLg ? whiteBarClasses.customContainer : '')}>{children}</Container>}>
                <Box className='flex justify-center items-center h-96' sx={{ height: { xs: '22em', md: 'fit-content' } }}>
                    <Box className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pt-4 md:py-6 px-2 sm:px-8 md:px-16' sx={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
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