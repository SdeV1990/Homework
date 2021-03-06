import React from 'react'
import clsx from 'clsx'
import { Switch, Route, Link } from 'react-router-dom' //Redirect
import useStyles from './styles'

// Material UI
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Container from '@material-ui/core/Container'
// import LinkUI from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import AssignmentIcon from '@material-ui/icons/Assignment'
// import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
// import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
// import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined'
// import Typography from '@material-ui/core/Typography'

// Components
import Navbar from './Navbar/Navbar'
import CMyDocuments from './MyDocuments/CMyDocuments'
import Home from './Home/Home'
import Auth from './Auth/Auth'
import CRecycled from './Recycled/CRecycled'
import CPrivateRoute from './CPrivateRoute'

import Document from './Document/DocumentVirtualized'
// import Document from './Document/Document'

export default function Main() {
    
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>

                    {/* Menu button */}
                    {JSON.parse(localStorage.getItem('profile')) ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    : 
                        <></>
                    }
                    <Navbar/>
                </Toolbar>
            </AppBar>
            
            {/* Drawer */}
            {
                JSON.parse(localStorage.getItem('profile')) 
            ?
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    </div>
                    <Divider />
                    <List>

                        {/* My Documents */}
                        <Link to={'/mydocuments'}>
                            <ListItem button key={'MyDocuments'}>
                                <ListItemIcon>
                                    { window.location.pathname === '/mydocuments' ? <AssignmentIcon /> : <AssignmentOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={'My Documents'} primaryTypographyProps={{underline: 'none'}}/>
                            </ListItem>
                        </Link>

                        {/* Friends */}
                        {/* <Link to={'/friends'}>
                            <ListItem button key={'Friends'}>
                                <ListItemIcon>
                                    { window.location.pathname === '/friends' ? <PeopleAltIcon /> : <PeopleAltOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={'Friends'} />
                            </ListItem>
                        </Link> */}

                        {/* Recycled */}
                        <Link to={'/recycled'}>
                            <ListItem button key={'Recycled'}>
                                <ListItemIcon>
                                    { window.location.pathname === '/recycled' ? <DeleteIcon /> : <DeleteOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={'Recycled'} />
                            </ListItem>
                        </Link>

                    </List>
                    {/* <Divider />
                    <List>

                        * Settings *
                        <Link to={'/settings'}>
                            <ListItem button key={'Settings'}>
                                <ListItemIcon>
                                    { window.location.pathname === '/settings' ? <SettingsApplicationsIcon /> : <SettingsApplicationsOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={'Settings'} />
                            </ListItem>
                        </Link>

                    </List> */}
                </Drawer>
            : 
                <></>
            }
                
            {/* Content */}
            <div className={classes.content}>
                <Switch>
                    <Route path="/auth" exact component={ JSON.parse(localStorage.getItem('profile')) ? CMyDocuments : Auth } />

                    <CPrivateRoute exact path="/mydocuments" redirectTo ="/auth">
                        <Container maxWidth="lg">
                            <CMyDocuments/>
                        </Container>
                    </CPrivateRoute>

                    <CPrivateRoute exact path="/recycled" redirectTo ="/auth">
                        <Container maxWidth="lg">
                            <CRecycled/>
                        </Container>
                    </CPrivateRoute>

                    <CPrivateRoute path="/document" redirectTo ="/auth">
                        <Document/>
                    </CPrivateRoute>

                    <Route path="/" exact component={ JSON.parse(localStorage.getItem('profile')) ? Home : Auth } />
                </Switch>
            </div>
        </div>
    );
}