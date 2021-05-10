import React, { useLayoutEffect } from 'react'
import MyDocumentsTable from './MyDocumentsTable/MyDocumentsTable.js'
import { actionGetDocuments, actionCreateDocument, actionDeleteDocument } from '../../actions/documents.js'
import * as actionType from '../../constants/actionTypes.js'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const MyDocuments = ( { documents, actionGetDocuments, actionCreateDocument, actionDeleteDocument } ) => {

    useLayoutEffect( () => {
        actionGetDocuments()
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    let isOpen = false
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

    // Create document statuses
    else if (documents.status === actionType.CREATE_DOCUMENT_SUCCESS) {
        isOpen = true
        alertText = "Document is created!"
        severity = "success"
    } else if (documents.status === actionType.CREATE_DOCUMENT_REJECTED) {
        isOpen = true
        alertText = "Error: document isn't created!"
        severity = "error"

    // Delete documents statuses
    } else if (documents.status === actionType.DELETE_DOCUMENTS_SUCCESS) {
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
    
    return (
        <>
            <MyDocumentsTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionDeleteDocument={actionDeleteDocument}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar isOpen={isOpen} alertText={alertText} severity={severity}/>
        </>
    )
}

const CMyDocuments = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionDeleteDocument } )(MyDocuments)

export default CMyDocuments