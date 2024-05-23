import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

function Breadcrumbs({ icon, title, route, light, showTitle }) {
  const { t, i18n } = useTranslation("dashboard");
  const routes = route.slice(0, -1);

  const translateRoute = useCallback((route) => {
    let text = route === '' ? 'Dashboard' : route.replaceAll("-", " ")
    if (i18n.exists(`dashboard:navbar.${text}`)) {
      text = t(`navbar.${text}`);
    } else if (i18n.exists(`dashboard:labels.${text}`)) {
      text = t(`labels.${text}`);
    } else {
      text = text;
    }
    return text;
  }, []);

  return (
    <Box mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white : grey[600]),
          },
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "nowrap",
            textWrap: "nowrap"
          }
        }}
      >
        <Link to="/">
          <Typography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            display="block"
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </Typography>
        </Link>
        {routes.map((el) => {
          const link = routes.slice(0, routes.indexOf(el) + 1).join('/');
          const text = translateRoute(el);

          return (
            <Link to={`/${link}`} key={el}>
              <Typography
                component="span"
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
                color={light ? "white" : "dark"}
                opacity={light ? 0.8 : 0.5}
                sx={{ lineHeight: 0 }}
              >
                {text}
              </Typography>
            </Link>
          )
        })}
        <Typography
          variant="button"
          fontWeight="bold"
          fontStyle="italic"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {translateRoute(title)}
        </Typography>
      </MuiBreadcrumbs>
    </Box>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
