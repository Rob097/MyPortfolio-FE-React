import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import CustomFileInput from '@/components/CustomFileInput';
import { Close, Edit, Image } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { REPLACE_MEDIA_MANAGER, useDashboardStore } from "shared/stores/DashboardStore";

const CoverImage = ({ coverImageUrl, setCoverImageUrl }) => {
    const { t } = useTranslation("dashboard");
    const myForm = useFormContext();
    const [store, dispatch] = useDashboardStore();

    const { field: coverImage } = useController({
        control: myForm.control,
        name: 'coverImage'
    });

    function handleReplaceCoverImage(file) {
        myForm.setValue('coverImage', file?.url ?? null);
        if (file) {
            setCoverImageUrl(file.url);
        } else {
            setCoverImageUrl(null);
        }
    }

    function handleChooseCoverImage() {
        dispatch({ type: REPLACE_MEDIA_MANAGER, payload: { open: true, onlyImages: true, onSelect: handleReplaceCoverImage } });
    }

    return (
        <>
            <CustomCard>
                <CustomCardHeader
                    title={t('entities.edit.cover-image')}
                    avatar={
                        <Image color='primary' fontSize='large' />
                    }
                />
                <CustomCardContent>
                    {coverImageUrl ?
                        <Box className='w-full relative h-48 xl:h-80 rounded-md shadow-md bg-no-repeat bg-cover bg-center' sx={{ backgroundImage: `url(${coverImageUrl})` }}>
                            <Box className='absolute -top-6 -right-4 flex flex-col items-center space-y-2'>
                                <Box className='p-1 bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-primary-50 transition-colors' onClick={() => handleReplaceCoverImage(null)}>
                                    <Close color='error' width='32' height='32' className='font-bold !text-3xl' />
                                </Box>
                                <Box className='p-1 bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-primary-50 transition-colors' onClick={handleChooseCoverImage}>
                                    <Edit color='inherit' width='32' height='32' className='font-bold !text-3xl' />
                                </Box>
                            </Box>
                        </Box>
                        :
                        <Box className='w-full flex-grow mt-4'>
                            <CustomFileInput
                                field={coverImage}
                                replaceFile={handleReplaceCoverImage}
                                removeFile={handleReplaceCoverImage}
                                rootClassName='w-full'
                                onlyImages
                            />
                        </Box>
                    }
                </CustomCardContent>
            </CustomCard>
        </>
    );
}

export default CoverImage;