import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import CustomFileInput from '@/components/CustomFileInput';
import { displayMessages } from '@/components/alerts';
import { Close, Edit, Image } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { MAX_FILE_SIZE } from "shared/utilities/constants";

const CoverImage = ({ coverImageUrl, setCoverImageUrl }) => {
    const myForm = useFormContext();

    const { field: coverImage } = useController({
        control: myForm.control,
        name: 'coverImage'
    });

    function handleReplaceCoverImage(file) {
        myForm.setValue('coverImage', file);
        if (file) {
            setCoverImageUrl(URL.createObjectURL(file));
        } else {
            setCoverImageUrl(null);
        }
    }

    function handleChooseCoverImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.maxFiles = 1;
        input.maxSize = MAX_FILE_SIZE;
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file && file.size <= MAX_FILE_SIZE) {
                handleReplaceCoverImage(file);
            } else {
                displayMessages([{ text: t('files.errors.too-large', { fileName: file?.name, maxSize: MAX_FILE_SIZE / ONE_MB }), level: 'error' }]);
            }
        };
        input.click();
    }

    return (
        <>
            <CustomCard>
                <CustomCardHeader
                    title="Cover Photo"
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