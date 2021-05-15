import React, { useState, useRef } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PostAddIcon from '@material-ui/icons/PostAdd'

export default function CreateDocumentForm(props) {

    // Get documents name list for comparing for creating only unique value
    const { rows } = props
    const nameList = rows.map(row => row.name)

    // Create new default document name
    const defaultDocumentName = useRef('NewDocument')

    // Create new default document name with index if it already exist
    const generateNewDocumentName = () => {

        if ( nameList.includes(defaultDocumentName.current) ) {

            // Create unique name by increasing index
            let index = 2
            do {
                defaultDocumentName.current = `${'NewDocument'}(${index})`
                index++
            } while (nameList.includes(defaultDocumentName.current))
        }
    }

    // Document name validation state
    const [isNewDocumentNameValid, setIsNewDocumentNameValid] = useState(false)

    // Validation of new document name
    const validate = (documentName) => {

        // If entered document name is exist in list
        if ( nameList.includes(documentName) ) {
            setIsNewDocumentNameValid(true)
        } else {
            setIsNewDocumentNameValid(false)
        }
    }

    // Open/close dialog form state
    const [open, setOpen] = useState(false)
    
    // To open dialog form
    const handleClickOpen = () => {
        setOpen(true)

        // Creating new document name with index
        generateNewDocumentName()

        // Validate new document name
        validate(defaultDocumentName.current)
    }
    
    //To close dialog form
    const handleClose = () => {
        setOpen(false);
    }

    // On changin input value of new document name
    const handleChange = (e) => {
        
        // Save value
        defaultDocumentName.current = (e.target.value)

        // Check entered new document name for existing in list
        validate(e.target.value)
    }
    
    // Create new document
    const createNewDocument = (e) => {

        const { actionCreateDocument } = props;
        actionCreateDocument({ name: defaultDocumentName.current })

        // Close dialog form after creation
        handleClose()
    }

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
                    defaultValue={defaultDocumentName.current}
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
    )
}