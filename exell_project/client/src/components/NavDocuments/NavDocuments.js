import React, { useEffect } from 'react';
import EnhancedTable from './EnhancedTable.js';
import { actionGetDocuments, actionCreateDocument, actionDeleteDocument } from '../../actions/documents.js';
import * as actionType from '../../constants/actionTypes.js';
import { connect } from 'react-redux';

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js';
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js';

const NavDocuments = ( { documents, actionGetDocuments, actionCreateDocument, actionDeleteDocument } ) => {

    useEffect( () => {
        actionGetDocuments();
    }, [] );

    console.log(documents.list);
    console.log(documents.status);
    
    let isOpen = false
    let alertText
    let severity // error, warning, info, success 

    // Fetch statuses
    if (documents.status == actionType.FETCH_DOCUMENTS_SUCCESS) {
        isOpen = true
        alertText = "Documents are loaded!"
        severity = "success"
    } else if (documents.status == actionType.FETCH_DOCUMENTS_REJECTED) {
        isOpen = true
        alertText = "ERROR: cann't load documents!"
        severity = "error"
    }
    // Create document statuses
    else if (documents.status == actionType.CREATE_DOCUMENT_SUCCESS) {
        isOpen = true
        alertText = "Document is created!"
        severity = "success"
    } else if (documents.status == actionType.CREATE_DOCUMENT_REJECTED) {
        isOpen = true
        alertText = "Error: document isn't created!"
        severity = "error"
    // Else statuses
    } else {
        isOpen = false
    }
    
    return (
        <>
            <EnhancedTable 
                documents={documents}
                actionGetDocuments={actionGetDocuments}
                actionCreateDocument={actionCreateDocument}
                actionDeleteDocument={actionDeleteDocument}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar isOpen={isOpen} alertText={alertText} severity={severity}/>
        </>
    );
}

const CNavDocuments = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionDeleteDocument } )(NavDocuments);

export default CNavDocuments;