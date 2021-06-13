import React, { useEffect } from 'react'
import RecycledTable from './RecycledTable/RecycledTable'
import { actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } from '../../actions/documents'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const Recycled = ( { documents, actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } ) => {

    useEffect( () => {
        actionGetDocuments({isRecycled: true})
    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    
    // console.log(documents)

    return (
        <>
            <RecycledTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionOpenDocument={actionOpenDocument}
                actionUpdateAndGetDocuments={actionUpdateAndGetDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar status={documents.status}/> 
        </>
    )
}

const CRecycled = connect( state => ({ documents: state.documents }), { actionGetDocuments, actionCreateDocument, actionOpenDocument, actionUpdateAndGetDocuments } )(Recycled)

export default CRecycled