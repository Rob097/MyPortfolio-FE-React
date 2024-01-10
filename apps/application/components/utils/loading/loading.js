import { Box } from '@mui/material';
import loadingClasses from './loading.module.scss';

export default function Loading({adaptToComponent}) {
    return (
        <Box id="loading-container" className={(adaptToComponent ? 'h-full' : 'h-screen') + " w-full fixed top-0 left-0 flex justify-center items-center z-10"}
            sx={({ palette, functions }) => ({
                backgroundColor: functions?.rgba(palette?.background?.main, 0.2),
                backdropFilter: 'saturate(250%) blur(5px)'
            })}
        >
            <LoadingComponent />
        </Box>
    )
}


const LoadingComponent = () => {

    return (
        <div className={loadingClasses.customLoading}>
            <svg className={loadingClasses.pl} viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0%" stopColor="#ff8500"/*#f425c7*/ />
                        <stop offset="100%" stopColor="#344767"/*#255ff4*/ />
                    </linearGradient>
                    <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff8500" />
                        <stop offset="100%" stopColor="#344767" />
                    </linearGradient>
                </defs>
                <circle className={loadingClasses.pl__ring} cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" strokeWidth="36" strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round" transform="rotate(-90,100,100)" />
                <line className={loadingClasses.pl__ball} stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" strokeWidth="36" strokeDasharray="1 165" strokeLinecap="round" />
            </svg>
        </div>
    );
}