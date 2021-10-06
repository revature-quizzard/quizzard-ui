/**
 * @Co-Author: Sean Taba
 */
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ForumIcon from '@mui/icons-material/Forum';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useHistory} from "react-router-dom";
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
import {useDispatch, useSelector} from "react-redux";
import {clearProfile, profileState} from "../../state-slices/user-profile/profile-slice";
import {authState, logoutUserReducer} from "../../state-slices/auth/auth-slice";
import { logout } from '../../remote/login-register-service';

export function NavigationComponent() {
    const state = useSelector(authState);
    const profState = useSelector(profileState);
    const dispatch = useDispatch();
    const history = useHistory();

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            textAlign: "center",
            flexDirection: "row",
            flexWrap: "wrap"

        },
        typography: {
            marginLeft: "20rem",
            width: "fit-content"
        },
        typographyIcons: {
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
        logoStyle: {
            textDecoration:'none',
            color:'gray',
            '&:hover':{color:'orange', textDecoration:'none'}
        }
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
        dispatch(logoutUserReducer());
        dispatch(clearProfile());
        logout();
        history.push('/login');
    };

    // @ts-ignore
    return (

        <>
            <div>
                <CssBaseline/>
                <AppBar
                    style={{background: "#4E3E61", color: '#7D7687 '}}
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.typography}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >


                        </IconButton>
                        <ButtonBase component={Link} to='/' className={classes.logoStyle}>
                            <Typography variant="h3" noWrap>
                                Qwizzard
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
                            {(open) ?
                            <ChevronLeftIcon />
                            :
                            <MenuIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {state.isAuthenticated ?
                            <>
                                <ListItem button component={Link} to={'/'} onClick={() => {
                                    handleLogout()
                                }}>

                                    <LoginIcon/><Typography color="inherit" variant="h6"
                                                            className={classes.typographyIcons}>Logout</Typography>
                                </ListItem>
                                <ListItem button component={Link} to={'/profile'}>

                                    <AccountBoxIcon/><Typography color="inherit" variant="h6"
                                                                 className={classes.typographyIcons}>Dashboard</Typography>
                                </ListItem>
                            </>
                            :
                            <>
                                <ListItem button component={Link} to={'/login'}>

                                    <ExitToAppIcon/><Typography color="inherit" variant="h6"
                                                                className={classes.typographyIcons}>Login</Typography>
                                </ListItem>
                                <ListItem button component={Link} to={'/register'}>

                                    <AppRegistrationIcon/> <Typography color="inherit" variant="h6"
                                                                       className={classes.typographyIcons}>Register</Typography>
                                </ListItem>
                            </>

                        }

                        <ListItem button component={Link} to={'/study'}>

                            <LibraryBooksIcon/> <Typography color="inherit" variant="h6"
                                                            className={classes.typographyIcons}>Discover
                            Sets</Typography>
                        </ListItem>

                        <ListItem button component={Link} to={'/forum'}>
                            <ForumIcon/> <Typography color="inherit" variant="h6"
                                                     className={classes.typographyIcons}>Forum</Typography>
                        </ListItem>

                        <ListItem button component={Link} to={'/lounge'}>

                            <SportsEsportsIcon/> <Typography color="inherit" variant="h6"
                                                             className={classes.typographyIcons}>Game</Typography>
                        </ListItem>
                    </List>

                </Drawer>
                {
                    // The following is a margin, need to fix to actually use margin css
                }
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography paragraph>
                    </Typography>
                    <Typography paragraph>

                    </Typography>
                </main>
            </div>

        </>

    )
        ;
}

export default NavigationComponent;
