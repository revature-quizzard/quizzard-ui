/**
 * @Co-Author: Sean Taba
 */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import {ButtonBase, Toolbar, Typography} from "@material-ui/core";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  useTheme,
} from "@mui/material";

import React from "react";

export function NavigationComponent(){

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      textAlign: "center",
    },
    alert: {
      textAlign: 'center',
      width: '30%',
      alignItems: 'center',
      marginLeft: '29rem'

    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle
      = () => {
    console.log("Notopen")
    setOpen(!open);
  };

  return (
<<<<<<< HEAD
      <>
        <div className={classes.root}>
          <CssBaseline/>
          <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
          >
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
              >

                <MenuIcon/>
              </IconButton>
              <ButtonBase component={Link} to='/'>

                <Typography variant="h6" noWrap>
                  Flashback
                </Typography>
              </ButtonBase>

            </Toolbar>

          </AppBar>
          <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerToggle}>
                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
              </IconButton>
            </div>
            <Divider/>
            <List>

              <ListItem button component = {Link} to={'/'}>

                <Typography color="inherit" variant="h6">Logout</Typography>
              </ListItem>
              <ListItem button component={Link} to={'/dashboard'}>

                <Typography color="inherit" variant="h6">Dashboard</Typography>
              </ListItem>

              <ListItem button component={Link} to={'/login'}>

                <Typography color="inherit" variant="h6">Login</Typography>
              </ListItem>
              <ListItem button component={Link} to={'/register'}>

                <Typography color="inherit" variant="h6">Register</Typography>
              </ListItem>


            </List>

          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Typography paragraph>
            </Typography>
            <Typography paragraph>

            </Typography>
          </main>
        </div>
      </>
=======
    <Navbar bg="dark" expand="md">
      <Container id="nav-container">
        <Navbar.Brand href="#" style={{ color: "white" }}>
          <img
            src="https://i.imgur.com/PAm216P.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Qwizzard Hat Logo"
          />{" "}
          Q W I Z Z A R D
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!auth.isAuthenticated && (
              <>
                <ButtonBase
                  className="text-light ml-2 mr-2 navLink authLink"
                  component={Link} to="/login"
                >
                  Login
                </ButtonBase>

                <ButtonBase
                  className="text-light ml-2 mr-2 navLink authLink"
                  component={Link} to="/register"
                >
                  Register
                </ButtonBase>
                <ButtonBase
                  className="text-light ml-2 mr-2 navLink authLink"
                  component={Link} to="/profile"
                >
                  My Profile
                </ButtonBase>
              </>
            )}
            {auth.isAuthenticated && (
              <>
                <Link className="text-light ml-2 mr-2 navLink" to="/study">
                  Study
                </Link>

                <Link className="text-light ml-2 mr-2 navLink" to="/update">
                  Update
                </Link>

                <Link id="" className="text-light ml-2 mr-2 navLink" to="/sets">
                  Create
                </Link>
                <ButtonBase
                  className="text-light ml-2 mr-2 navLink authLink"
                  component={Link} to="/profile"
                >
                  My Profile
                </ButtonBase>
                <Link
                  id="logout"
                  className="text-light ml-2 mr-2 navLink authLink"
                  onClick={handleLogout}
                  to="/"
                >
                  Logout
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
>>>>>>> 1aed06fdd7a52002654a96d791f2ecc24831ec8e
  );
}

export default NavigationComponent;
