import React, { useEffect } from 'react'
import MyDocumentsTable from './MyDocumentsTable/MyDocumentsTable.js'
import { actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } from '../../actions/documents.js'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const MyDocuments = ( { documents, auth, actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } ) => {

    useEffect( () => {
        actionGetDocuments({isRecycled: false})
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
            <MyDocumentsTable 
                documents={documents}
                auth={auth}
                actionCreateDocument={actionCreateDocument}
                actionOpenDocument={actionOpenDocument}
                actionUpdateAndGetDocuments={actionUpdateAndGetDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar documents={documents}/> 
        </>
    )
}

const CMyDocuments = connect( state => ({ documents: state.documents, auth: state.auth }), { actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } )(MyDocuments)

export default CMyDocuments