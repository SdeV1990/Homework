import React, { useEffect } from 'react'
import RecycledTable from './RecycledTable/RecycledTable'
import { actionGetRecycledDocuments, actionCreateDocument, actionDeleteDocuments } from '../../actions/documents'
import { connect } from 'react-redux'

import CustomizedSnackbar from '../Feedback/CustomizedSnackbar.js'
import CustomizedBackdrop from '../Feedback/CustomizedBackdrop.js'

const Recycled = ( { documents, actionGetRecycledDocuments, actionCreateDocument, actionDeleteDocuments } ) => {

    useEffect( () => {
        actionGetRecycledDocuments()
        console.log(documents)

    }, [] )  // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <>
            <RecycledTable 
                documents={documents}
                actionCreateDocument={actionCreateDocument}
                actionDeleteDocuments={actionDeleteDocuments}
            />
            <CustomizedBackdrop status={documents.status}/>
            <CustomizedSnackbar documents={documents}/> 
        </>
    )
}

const CRecycled = connect( state => ({ documents: state.documents }), { actionGetRecycledDocuments, actionCreateDocument, actionDeleteDocuments } )(Recycled)

export default CRecycled