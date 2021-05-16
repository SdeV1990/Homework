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

export default function CustomizedSnackbar({ documents }) {
    const classes = useStyles();

    let isOpen
    let alertText
    let severity // values: error, warning, info, success 

    // Fetch documents statuses
    if (documents.status === actionType.FETCH_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Documents are loaded!"
        severity = "success"
    } else if (documents.status === actionType.FETCH_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "ERROR: cann't load documents!"
        severity = "error"
    }

    // Fetch recycled documents statuses
    else if (documents.status === actionType.FETCH_RECYCLED_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Recycled documents are loaded!"
        severity = "success"
    } else if (documents.status === actionType.FETCH_RECYCLED_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "ERROR: cann't load recycled documents!"
        severity = "error"
    }

    // Create document statuses
    else if (documents.status === actionType.CREATE_DOCUMENT_SUCCESS) {
        isOpen = true
        alertText = "Document is created!"
        severity = "success"
    } else if (documents.status === actionType.CREATE_DOCUMENT_REJECTED) {
        isOpen = true
        alertText = "Error: document isn't created!"
        severity = "error"
    }

    // Recycle documents statuses
    else if (documents.status === actionType.RECYCLE_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Documents are recycled!"
        severity = "success"
    } else if (documents.status === actionType.RECYCLE_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "Error: documents aren't recycled!"
        severity = "error"
    }

    // Restore documents statuses
    else if (documents.status === actionType.RESTORE_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Documents are restored!"
        severity = "success"
    } else if (documents.status === actionType.RESTORE_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "Error: documents aren't restored!"
        severity = "error"
    }

    // Delete documents statuses
    else if (documents.status === actionType.DELETE_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Documents are deleted!"
        severity = "success"
    } else if (documents.status === actionType.DELETE_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "Error: documents aren't deleted!"
        severity = "error"

    // Else statuses
    } else {
        isOpen = false
    }

    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]) 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} >
                    {alertText}
                </Alert>
            </Snackbar>
        </div>
    );
}