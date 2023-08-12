import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import classes from './PageLayout.module.scss';

function PageLayout(props) {
  const theme = useTheme();
  const { palette } = theme;
  const background = palette[props.background] ? palette[props.background] : props.background;

  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      bgcolor={background}
      sx={{ display: 'flow-root', overflowX: { xs: 'hidden', md: "visible" } }}
    >
      <BgVector up />

      {props.children}

      <BgVector/>
    </Box>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

const BgVector = (props) => {
  return (
    <div style={{position: 'relative', zIndex: 0}}>
      <div className={props.up ? classes.bgVectorUp : classes.bgVectorDown}>
        <img src="/images/Vector.png" style={{width: '35em', maxWidth: '100%'}} />
      </div>
      <div className={props.up ? classes.bgVectorUp : classes.bgVectorDown}>
        <img src="/images/Vector-1.png" style={{width: '35em', maxWidth: '100%'}} />
      </div>
      <div className={props.up ? classes.bgVectorUp : classes.bgVectorDown}>
        <img src="/images/Vector-2.png" style={{width: '35em', maxWidth: '100%'}} />
      </div>
    </div>
  )
}