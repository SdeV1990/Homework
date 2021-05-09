import React, { useState, useEffect } from 'react';
import { Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import exellIcon from '../../images/excel-icon.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {

    // get user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 
    
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user && user.token ? user.token : false; // user?.token;

        if (token) {
            const decodedToken = decode(token);

            if ( decodedToken.exp * 1000 < new Date().getTime() ) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classes.appBar} position="static" >
            <div className={classes.brandContainer}>
                <img className={classes.image} src={exellIcon} alt="icon" height="40" />
                <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center" noWrap>MyExU Project</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                { user && user.result ? ( // user?.result
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </div>
    );
};

export default Navbar;
