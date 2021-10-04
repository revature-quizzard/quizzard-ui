/**
 * @Co-Author: Sean Taba
 */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ForumIcon from '@mui/icons-material/Forum';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

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
import { quizzardApiClientTokenAuthorized } from '../../remote/api-client';

export function NavigationComponent(){

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      textAlign: "center",
      flexDirection: "row",
      flexWrap: "wrap"
      
    },
    typography:{
      paddingLeft: "12rem"
    },
    typographyIcons:{
      paddingLeft: "3rem"
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
      background: "#7D7687 "
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: "#332347"
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
      background: "#332347"
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

  const handleLogout = () => {
    quizzardApiClientTokenAuthorized.defaults.headers.common["authorization"] = null;
  }

  return (

      <>
        <div>
          <CssBaseline/>
          <AppBar
              position="fixed"
              style={{background: "#4E3E61" , color: '#7D7687 '}}
           
          >
            <Toolbar  >
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

                <Typography className={classes.typography} variant="h6" noWrap>
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
            <div  className={classes.toolbar}>
              <IconButton onClick={handleDrawerToggle}>
                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
              </IconButton>
            </div >
            <Divider/>
            <div  >
            <List   >

              <ListItem button component = {Link} to={'/'} onClick={handleLogout}>

                <LoginIcon/><Typography color="inherit" variant="h6" className={classes.typographyIcons}>Logout</Typography>
              </ListItem>

              <ListItem button component={Link} to={'/login'}>

                <ExitToAppIcon/><Typography color="inherit" variant="h6" className={classes.typographyIcons}>Login</Typography>
              </ListItem>
              <ListItem button component={Link} to={'/profile'}>

                <AccountBoxIcon/><Typography color="inherit" variant="h6" className={classes.typographyIcons}>Dashboard</Typography>
              </ListItem>
              <ListItem button component={Link} to={'/register'}>

                <AppRegistrationIcon/> <Typography color="inherit" variant="h6" className={classes.typographyIcons}>Register</Typography>
              </ListItem>

              <ListItem button component={Link} to={'/study'}>

                <LibraryBooksIcon/> <Typography color="inherit" variant="h6" className={classes.typographyIcons}>Discover Sets</Typography>
              </ListItem>

              <ListItem button component={Link} to={'/register'}>

                <ForumIcon/> <Typography color="inherit" variant="h6" className={classes.typographyIcons}>Forum</Typography>
              </ListItem>

              <ListItem button component={Link} to={'/register'}>

                <SportsEsportsIcon/> <Typography color="inherit" variant="h6" className={classes.typographyIcons}>Game</Typography>
              </ListItem>


            </List>
        </div>
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

  );
}

export default NavigationComponent;
