import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import * as actionType from '../../constants/actionTypes';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function CustomizedBackdrop({status}) {
    let isOpen;

    // Check status for pending
    if (
        status == actionType.FETCH_DOCUMENTS_PENDING ||
        status == actionType.CREATE_DOCUMENT_PENDING
    ) {
        isOpen = true
    } else {
        isOpen =false
    }

    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={isOpen} >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}