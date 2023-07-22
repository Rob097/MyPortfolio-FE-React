import { useMediaQuery } from '@mui/material';

export function useBreakpoints() {
    const isGreaterThan = (breakpointKey) => useMediaQuery((theme) => theme.breakpoints.up(breakpointKey));
    const isSmallerThan = (breakpointKey) => useMediaQuery((theme) => theme.breakpoints.down(breakpointKey));
    return {
        isGreaterThan,
        isSmallerThan
    };
}