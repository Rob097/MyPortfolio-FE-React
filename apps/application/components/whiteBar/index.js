import { Box, Container } from '@mui/material';
import boxShadows from "@rob097/common-lib/assets/theme/base/boxShadows";
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';

const WhiteBar = (props) => {

    return (
        <Container className={whiteBarClasses.customContainer + " " + props.containerClasses} style={{ zIndex: 1, ...props.containerStyles }} {...props.containerProps}>
            <Box
                width={{ md: "100%" }}
                height={props.height || "auto"}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mx='auto'
                my={2}
                py={1.5}
                px={5}
                sx={({ palette: { white }, functions: { rgba } }) => ({
                    backgroundColor: rgba(white.main, 0.6),
                    backdropFilter: `saturate(200%) blur(30px)`,
                    borderRadius: {xs: '1rem', md: '9999px'},
                    boxShadow: boxShadows["md"]
                })}
            >
                {props.children}
            </Box>
        </Container>
    )

}

export default WhiteBar;