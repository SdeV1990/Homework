import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import * as actionType from '../../constants/actionTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbar({ status }) {
    const classes = useStyles()

    let isOpen
    let alertText
    let severity // values: error, warning, info, success - for component styling 

    // Create document statuses
    if (status === actionType.CREATE_DOCUMENT_SUCCESS) {
        isOpen = true
        alertText = "Document is created!"
        severity = "success"
    } else if (status === actionType.CREATE_DOCUMENT_REJECTED) {
        isOpen = true
        alertText = "Error: document isn't created!"
        severity = "error"
    }

    // Update documents statuses
    else if (status === actionType.UPDATE_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Document is updated!"
        severity = "success"
    } else if (status === actionType.UPDATE_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "Error: documents isn't updated!"
        severity = "error"
    }

    // Else statuses
    else {
        isOpen = false
    }

    // Open status
    const [open, setOpen] = useState(isOpen);

    // For rendering
    useEffect(() => {
        setOpen(isOpen)
    }, [status]) 

    // If there is click away
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} >
                    {alertText}
                </Alert>
            </Snackbar>
        </div>
    )
}