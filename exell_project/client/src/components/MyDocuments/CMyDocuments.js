import React, { useEffect } from 'react'
import MyDocumentsTable from './MyDocumentsTable/MyDocumentsTable.js'
import { actionGetDocuments, actionCreateDocument, actionDeleteDocuments } from '../../actions/documents.js'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const MyDocuments = ( { documents, actionGetDocuments, actionCreateDocument, actionDeleteDocuments } ) => {

    useEffect( () => {
        actionGetDocuments()
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
            <MyDocumentsTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionDeleteDocuments={actionDeleteDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar documents={documents}/> 
        </>
    )
}

const CMyDocuments = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionDeleteDocuments } )(MyDocuments)

export default CMyDocuments