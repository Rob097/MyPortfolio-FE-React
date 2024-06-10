import DraggableBox from '@/components/draggableBox';
import ShowIf from '@/components/utils/showIf';
import { Box, Button, Chip, Typography } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';

const HorizontalCard = ({ id, image, title, firstSubtitle, secondSubtitle, chips, buttons, children: mainContent }) => {

    return (
        <Box className="w-full max-w-sm md:max-w-full h-fit bg-white border rounded-lg mb-4 py-4 md:py-0 flex flex-col md:flex-row text-center md:text-start items-center px-2 md:px-8 z-10 relative">
            <ShowIf condition={image !== undefined}>
                {/* <Avatar
                    alt="Remy Sharp"
                    src={image}
                    sx={{ width: 70, height: 70 }}
                /> */}
                <Image src={image} width={70} height={70} style={{ width: '70px', height: '70px' }} className='rounded-full object-cover' alt={title + (firstSubtitle ? (' - ' + firstSubtitle) : '') + (secondSubtitle ? (' - ' + secondSubtitle) : '')} />
            </ShowIf>
            <Box className="md:ml-4 py-2 flex flex-col max-w-full md:pr-8">
                <Typography variant="h5" fontWeight='bold' color='black'>{title}</Typography>
                <Box className='flex flex-col md:flex-row md:divide-x-2'>
                    <Typography variant="body2" color='black' paddingRight={{ xs: 0, md: 2 }}>{firstSubtitle}</Typography>
                    <Typography variant="body2" color='black' paddingLeft={{ xs: 0, md: 2 }} sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", }}>{secondSubtitle}</Typography>
                </Box>
                {chips?.length > 0 &&
                    <DraggableBox noDrag={chips?.length < 3}>
                        {chips?.map((chip, index) => (
                            <Chip key={"chip-" + id + "-" + chip.id} id={"chip-" + id + "-" + chip.id} label={chip.name} />
                        ))}
                    </DraggableBox>
                }
            </Box>

            <ShowIf condition={mainContent !== undefined}>
                <Box display={{ xs: 'none', xl: 'flex' }} className="ml-auto flex-col justify-between">
                    {mainContent}
                </Box>
            </ShowIf>

            <ShowIf condition={buttons?.length > 0}>
                <Box className="mx-auto md:mx-0 md:ml-auto mt-4 md:mt-0 flex flex-col justify-between">
                    <Box className="flex flex-col xl:flex-row justify-between items-center space-y-2 xl:space-y-0">
                        <Link href={buttons[0]?.link}>
                            <Button variant="outlined" color="primary" size="small" className='h-fit py-2 xl:mr-2 whitespace-nowrap'>
                                {buttons[0]?.label}
                            </Button>
                        </Link>
                        <Link href={buttons[1]?.link}>
                            <Button variant="contained" color="primary" size="small" className='h-fit py-2 whitespace-nowrap'>
                                {buttons[1]?.label}
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </ShowIf>
        </Box>
    )
}

export default HorizontalCard;