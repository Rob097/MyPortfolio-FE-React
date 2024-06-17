import ExpandableSection from '@/components/ExpandableSection';
import { Button, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useDashboardStore } from "shared/stores/DashboardStore";
import DeleteUserProfile from './deleteUser';

const Plan = () => {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");

    const MainBody = () => {
        const { t } = useTranslation("dashboard");

        return (
            <>
                <Grid container spacing={4} className='mb-4'>
                    <Grid item xs={12} md={4}>
                        <Card className='w-full p-4 !bg-primary-main rounded-lg !shadow-lg !shadow-primary-main'>
                            <Typography variant='h6' color="white" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.basic.title')}
                            </Typography>
                            <Typography variant='h3' color="white" fontWeight={theme => theme.typography.fontWeightBold} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.basic.price')}
                            </Typography>
                            <Button variant='outlined' className='!mt-4 !bg-white !text-primary'>{t('user-profile.plan.selected')}</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className='w-full p-4 !bg-gray-200 rounded-lg !shadow-lg'>
                            <Typography variant='h6' color="black" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.professional.title')}
                            </Typography>
                            <Typography variant='h3' color="black" fontWeight={theme => theme.typography.fontWeightBold} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.professional.price')}
                                <Typography variant='body2' component="span" color="black" fontWeight={theme => theme.typography.fontWeightRegular} gutterBottom>
                                    {t('user-profile.plan.professional.type')}
                                </Typography>
                            </Typography>
                            <Button variant='outlined' color='inherit' disabled className='!mt-4'>{t('user-profile.plan.coming-soon')}</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className='w-full p-4 !bg-gray-200 rounded-lg !shadow-lg'>
                            <Typography variant='h6' color="black" fontWeight={theme => theme.typography.fontWeightMedium} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.organization.title')}
                            </Typography>
                            <Typography variant='h3' color="black" fontWeight={theme => theme.typography.fontWeightBold} gutterBottom textTransform="uppercase">
                                {t('user-profile.plan.organization.price')}
                                <Typography variant='body2' component="span" color="black" fontWeight={theme => theme.typography.fontWeightRegular} gutterBottom>
                                    {t('user-profile.plan.organization.type')}
                                </Typography>
                            </Typography>
                            <Button variant='outlined' color='inherit' disabled className='!mt-4'>{t('user-profile.plan.coming-soon')}</Button>
                        </Card>
                    </Grid>
                </Grid>

                <DeleteUserProfile fullName={`${store.user.firstName} ${store.user.lastName}`} />
            </>
        )
    }

    return (
        <ExpandableSection
            mainTitle={t('user-profile.plan.title')}
            MainBody={<MainBody />}
        />
    )
}

export default Plan;