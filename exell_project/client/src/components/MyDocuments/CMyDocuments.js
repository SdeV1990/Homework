import React, { useEffect } from 'react'
import MyDocumentsTable from './MyDocumentsTable/MyDocumentsTable.js'
import { actionGetDocuments, actionCreateDocument, actionRecycleDocuments } from '../../actions/documents.js'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const MyDocuments = ( { documents, actionGetDocuments, actionCreateDocument, actionRecycleDocuments } ) => {

    useEffect( () => {
        actionGetDocuments()
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
            <MyDocumentsTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionRecycleDocuments={actionRecycleDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar documents={documents}/> 
        </>
    )
}

const CMyDocuments = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionRecycleDocuments } )(MyDocuments)

export default CMyDocuments