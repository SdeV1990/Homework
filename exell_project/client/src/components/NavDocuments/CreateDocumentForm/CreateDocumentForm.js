import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormCreateDocument() {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const [newDocumentNameValue, setNewDocumentNameValue] = useState("NewDocument");

    const handleChange = (e) => {
        setNewDocumentNameValue(e.target.value);
    }

    const createNewDocument = (e) => {
        alert(newDocumentNameValue);
        handleClose();
    }

    return (
        <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create new document
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Please, enter new document name.</DialogTitle>
            <DialogContent>
            {/* <DialogContentText>
                To create a new document, please enter its name here.
            </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                id="NewDocumentName"
                label="New document name"
                type="text"
                required="true"
                defaultValue={newDocumentNameValue}
                error="false" // Will customize
                onChange={handleChange}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={createNewDocument} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}