import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import PostAddIcon from '@material-ui/icons/PostAdd';

export default function CreateDocumentForm(props) {

    // Create new default document name
    const { rows } = props;
    const nameList = rows.map(row => row.name);
    let defaultDocumentName = 'NewDocument'

    if (nameList.includes(defaultDocumentName)) {
        let index = 2
        do {
            defaultDocumentName = `${'NewDocument'}(${index})`
            index++
        } while (nameList.includes(defaultDocumentName));
    }
        
    // Validate new document name
    const [isNewDocumentNameValid, setIsNewDocumentNameValid] = useState(false);

    const handleChange = (e) => {
        defaultDocumentName = e.target.value;
        if (nameList.includes(e.target.value)) {
            setIsNewDocumentNameValid(true);
        } else {
            setIsNewDocumentNameValid(false);
        }
    }

    // Create new document
    const { actionCreateDocument } = props;

    const createNewDocument = (e) => {
        actionCreateDocument({ name: defaultDocumentName });
        handleClose();
    }

    // Dialog controls
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Create new document">
                <IconButton aria-label="create new document" onClick={handleClickOpen}>
                    <PostAddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Document</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To create a new document, please enter its unique name here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="NewDocumentName"
                    label="New document name"
                    type="text"
                    required={true}
                    defaultValue={defaultDocumentName}
                    error={isNewDocumentNameValid} // Will customize
                    onChange={handleChange}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" >
                    Cancel
                </Button>
                <Button onClick={createNewDocument} color="primary" disabled={isNewDocumentNameValid} >
                    Create
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}