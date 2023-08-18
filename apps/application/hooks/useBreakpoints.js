import { useMediaQuery } from '@mui/material';
import { theme } from '@/tailwind.config'; // Your tailwind config

const breakpoints = theme.screens;

export function useBreakpoints() {
    const isGreaterThan = (breakpointKey) => useMediaQuery(`(min-width: ${breakpoints[breakpointKey]})`);
    const isSmallerThan = (breakpointKey) => useMediaQuery(`(max-width: ${breakpoints[breakpointKey]})`);

    return {
        isGreaterThan,
        isSmallerThan
    };
}