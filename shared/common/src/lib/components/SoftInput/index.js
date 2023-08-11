import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Box from '@mui/material/Box';
import SoftInputIconBoxRoot from "./SoftInputIconBoxRoot";
import SoftInputIconRoot from "./SoftInputIconRoot";
import SoftInputRoot from "./SoftInputRoot";
import SoftInputWithIconRoot from "./SoftInputWithIconRoot";

const SoftInput = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;
  const direction = rest?.direction;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftInputIconBoxRoot ownerState={{ size }}>
          <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftInputIconRoot>
        </SoftInputIconBoxRoot>
        <SoftInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
      </SoftInputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <>
        <SoftInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
          <SoftInputRoot
            {...rest}
            ownerState={{ size, error, success, iconDirection, direction, disabled }}
          />
          <SoftInputIconBoxRoot ownerState={{ size }} onClick={icon.onClick}>
            <SoftInputIconRoot fontSize="small" ownerState={{ size }}>
              {icon.component}
            </SoftInputIconRoot>
          </SoftInputIconBoxRoot>
        </SoftInputWithIconRoot>
        {
          rest && rest.helpertext &&
          <Box mb={1} ml={0.5}>
            <FormHelperText id={rest.helpertext} style={{ marginLeft: '0' }} error={error}>{rest.helpertext}</FormHelperText>
          </Box>
        }
      </>
    );
  } else {
    template = (
      <>
        <SoftInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} inputProps={{ autoComplete: rest.id ? rest.id : undefined }} />
        {
          rest && rest.helpertext &&
          <Box mb={1} ml={0.5}>
            <FormHelperText id={rest.helpertext} style={{ marginLeft: '0' }} error={error}>{rest.helpertext}</FormHelperText>
          </Box>
        }
      </>
    );
  }

  return template;
});

// Setting default values for the props of SoftInput
SoftInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false
};

// Typechecking props for the SoftInput
SoftInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SoftInput;
