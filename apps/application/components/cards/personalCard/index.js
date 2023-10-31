import ShowIf from '@/components/utils/showIf';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Avatar, Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './personalCard.module.scss';

const PersonalCard = (props) => {
    const { t } = useTranslation(['user-home']);
    const [isAvatarMoved, setIsAvatarMoved] = useState(undefined);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanSm = isGreaterThan('sm') ?? false;

    function moveAvatar(event, forceTo) {
        const newState = isAvatarMoved === undefined ? (forceTo ?? true) : (forceTo ?? !isAvatarMoved);
        setIsAvatarMoved(newState);
    }

    function setAvatarRight() {
        const personalCardWidth = document.getElementById('personalCard').offsetWidth;
        const personalCardHeight = document.getElementById('personalCard').offsetHeight;

        // get element with id "personalCardAvatar":
        document.getElementById('personalCardAvatar').style.position = 'absolute';
        isGreaterThanSm ?
            document.getElementById('personalCardAvatar').style.transform = ` translateX(${personalCardWidth - 2 * 100}px)` :
            document.getElementById('personalCardAvatar').style.transform = ` translateY(${personalCardHeight - 100 - 16}px)`;
    }

    function setAvatarLeft() {
        document.getElementById('personalCardAvatar').style.position = 'relative';

        isGreaterThanSm ?
            document.getElementById('personalCardAvatar').style.transform = `translateX(0px)` :
            document.getElementById('personalCardAvatar').style.transform = `translateY(0px)`;
    }

    if (typeof window !== "undefined") {
        window.addEventListener("resize", () => moveAvatar(null, false));
    }

    useEffect(() => {
        if (isAvatarMoved === true) {
            setAvatarRight();
        } else if (isAvatarMoved === false) {
            setAvatarLeft();
        }

    }, [isAvatarMoved]);

    return (
        <div id="personalCard" className={classes.personalCard + ' relative align-center w-fit bg-white m-auto h-fit'} style={isGreaterThanSm && isAvatarMoved ? { borderRadius: '4rem 10rem 10rem 4rem' } : {}}>
            <Grid container className='sm:py-0 py-2'>
                <ShowIf condition={isAvatarMoved === true}>
                    <Grid item xs={12} sm={9} className={(!isGreaterThanSm ? 'pb-20' : '') + ' absolute top-0 left-0 w-full h-full flex justify-center items-center'}>
                        <Link href={props.sectionToScrollTo} scroll={false}>
                            <div className='flex flex-row items-center mx-auto text-center bg-white cursor-pointer'>
                                <Icon
                                    sx={{
                                        color: ({ palette: { primary } }) => (primary.main),
                                        verticalAlign: "middle",
                                    }}
                                >
                                    email
                                </Icon>
                                <Typography variant='body2' color='primary' fontWeight="bold" className='ml-2' >{t('contact-me.title')}!</Typography>
                            </div>
                        </Link>
                    </Grid>
                </ShowIf>
                <Grid item xs={12} sm={3} className='flex justify-center sm:justify-start items-center'>
                    <ShowIf condition={isAvatarMoved === true}>
                        <Box width='100px' height='100px'>
                        </Box>
                    </ShowIf>
                    <Avatar id="personalCardAvatar" src={props.image} className={classes.personalCardAvatar} sx={{ width: 100, height: 100, transition: '0.5s ease-out' }} variant='circular' onClick={moveAvatar} />
                </Grid>
                <Grid item xs={12} sm={9} className={(isAvatarMoved ? '-z-10' : '') + ' flex justify-center items-center'}>
                    <div className='ml-auto mr-auto sm:ml-8 text-center sm:text-left' style={{ opacity: isAvatarMoved ? 0 : 1 }}>
                        <Typography variant='body2' color='text' >{props.phone}</Typography>
                        <Typography variant='body2' color='text' >{props.email}</Typography>
                        <Typography variant='body2' color='text' >{props.city}</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default PersonalCard;