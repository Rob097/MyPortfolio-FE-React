import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Box from '@mui/material/Box';
import SoftTypography from "common-new/components/SoftTypography";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { menuImage, menuItem } from "./styles";

const NotificationItem = forwardRef(({ color, image, title, date, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <Box
      width="2.25rem"
      height="2.25rem"
      mt={0.25}
      mr={2}
      mb={0.25}
      sx={(theme) => menuImage(theme, { color })}
    >
      {image}
    </Box>
    <Box>
      <SoftTypography variant="button" textTransform="capitalize" fontWeight="regular">
        <strong>{title[0]}</strong> {title[1]}
      </SoftTypography>
      <SoftTypography
        variant="caption"
        color="secondary"
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.5,
        }}
      >
        <SoftTypography variant="button" color="secondary">
          <Icon
            sx={{
              lineHeight: 1.2,
              mr: 0.5,
            }}
          >
            watch_later
          </Icon>
        </SoftTypography>
        {date}
      </SoftTypography>
    </Box>
  </MenuItem>
));

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  image: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
