import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import classes from './navbar.module.scss';

function Navbar(props) {
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        width: { md: `calc(100% - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
        marginBottom: theme.spacing(2),
      })}
      color='transparent'
      elevation={0}
      className={classes.customAppBar}
    >
      <Toolbar
        className={classes.customToolbar}
        sx={(theme) => ({
          borderRadius: theme.rounded.lg,
          boxShadow: theme.shadows[3]
        })}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;