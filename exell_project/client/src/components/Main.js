import React from 'react'
import clsx from 'clsx'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
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
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

// import Typography from '@material-ui/core/Typography'

// Components
import Navbar from './Navbar/Navbar.js'
import CMyDocuments from './MyDocuments/CMyDocuments.js'
import Home from './Home/Home'
import Auth from './Auth/Auth'


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Origin https://reactrouter.com/web/example/auth-workflow
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        // Rendering depends on auth.user state - render children if exist or redirect to login page if not
        // https://ru.reactjs.org/docs/render-props.html
        render={({ location }) =>
          JSON.parse(localStorage.getItem('profile')) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default function Main() {
    
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
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
            {JSON.parse(localStorage.getItem('profile')) ?
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
                                    <AssignmentOutlinedIcon /> 
                                    {/* <AssignmentIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={'My Documents'} />
                            </ListItem>
                        </Link>

                        {/* Friends */}
                        <Link to={'/friends'}>
                            <ListItem button key={'Friends'}>
                                <ListItemIcon>
                                    <PeopleAltOutlinedIcon />
                                    {/* <PeopleAltIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={'Friends'} />
                            </ListItem>
                        </Link>

                        {/* Recycled */}
                        <Link to={'/recycled'}>
                            <ListItem button key={'Recycled'}>
                                <ListItemIcon>
                                    <DeleteOutlinedIcon />
                                    {/* <DeleteIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={'Recycled'} />
                            </ListItem>
                        </Link>

                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            : 
                <></>
            }
                
            {/* Content */}
            <div className={classes.content}>
                <Switch>
                    <PrivateRoute path="/mydocuments">
                        <CMyDocuments/>
                    </PrivateRoute>
                    <Route path="/auth" exact component={ JSON.parse(localStorage.getItem('profile')) ? CMyDocuments : Auth } />
                    <Route path="/" component={ JSON.parse(localStorage.getItem('profile')) ? Home : Auth } />
                </Switch>
            </div>
        </div>
    );
}