import React, { useEffect } from 'react'
import RecycledTable from './RecycledTable/RecycledTable'
import { actionGetRecycledDocuments, actionCreateDocument, actionOpenDocument, actionDeleteDocuments, actionRestoreDocuments } from '../../actions/documents'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const Recycled = ( { documents, actionGetRecycledDocuments, actionCreateDocument, actionOpenDocument, actionDeleteDocuments, actionRestoreDocuments } ) => {

    useEffect( () => {
        actionGetRecycledDocuments()
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    console.log(documents)

    return (
        <>
            <RecycledTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionOpenDocument={actionOpenDocument}
                actionDeleteDocuments={actionDeleteDocuments}
                actionRestoreDocuments={actionRestoreDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar documents={documents}/> 
        </>
    )
}

const CRecycled = connect( state => ({ documents: state.documents }), { actionGetRecycledDocuments, actionCreateDocument, actionOpenDocument, actionDeleteDocuments, actionRestoreDocuments } )(Recycled)

export default CRecycled