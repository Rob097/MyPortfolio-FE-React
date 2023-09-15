import { Box } from '@mui/material';
import loadingClasses from './loading.module.scss';

export default function Loading() {
    return (
        <Box id="loading-container" className="w-full h-screen absolute top-0 left-0 flex justify-center items-center z-10"
            sx={({ palette: { background }, functions: { rgba } }) => ({
                backgroundColor: rgba(background.main, 0.2),
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
                        <stop offset="0%" stop-color="#ff8500"/*#f425c7*/ />
                        <stop offset="100%" stop-color="#344767"/*#255ff4*/ />
                    </linearGradient>
                    <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ff8500" />
                        <stop offset="100%" stop-color="#344767" />
                    </linearGradient>
                </defs>
                <circle className={loadingClasses.pl__ring} cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" strokeLinecap="round" transform="rotate(-90,100,100)" />
                <line className={loadingClasses.pl__ball} stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" strokeLinecap="round" />
            </svg>
        </div>
    );
}