import * as actionType from '../constants/actionTypes'
import * as api from '../api/index.js'

// ********** Single actions **********

export const actionGetDocuments = (optionsOfGet) => async (dispatch) => {
    try {
        
        // Pending status
        dispatch({ type: actionType.FETCH_DOCUMENTS_PENDING})

        // Request to database
        const documents = await api.getDocuments(optionsOfGet)

        // Success status
        dispatch({ type: actionType.FETCH_DOCUMENTS_SUCCESS, payload: documents })

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED })
        console.log(error)

    }
}

export const actionCreateDocument = (optionsOfCreate) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.CREATE_DOCUMENT_PENDING})
        
        // Request to database
        const response  = await api.createDocument(optionsOfCreate)

        // If creating is successful
        if (response.data.message === 'SUCCESS') {

            // Success status
            dispatch({ type: actionType.CREATE_DOCUMENT_SUCCESS })

        } else {
            throw new Error('CREATE NOT SUCCESSFUL')
        }

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.CREATE_DOCUMENT_REJECTED })
        console.log(error); 

    }
}

export const actionOpenDocument = (documentsIDToOpen) => async (dispatch) => {
    try {

        // Pending status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_PENDING })

        // Open document in new tab
        window.open(`http://localhost:3000/document/${documentsIDToOpen.selectedDocuments[0]}`)
        
        // Success status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_SUCCESS })

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_REJECTED })
        console.log(error)

    }
}

export const actionUpdateDocuments = (optionsOfUpdate) => async (dispatch) => {
    try {
        
        // Pending status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_PENDING })
        
        // Request to database
        const response  = await api.updateDocuments(optionsOfUpdate)

        // If updating is successful
        if (
            response.data.message === 'RESTORE: SUCCESS' ||
            response.data.message === 'DELETE: SUCCESS' ||
            response.data.message === 'RECYCLE: SUCCESS'
        ) {

            // Success status
            dispatch({ type: actionType.UPDATE_DOCUMENTS_SUCCESS})

        } else {
            throw new Error('UPDATE NOT SUCCESSFUL')
        }
        
    } catch (error) {
        
        // Rejected status
        console.log(error)
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED })

    }
}

// ********** Double actions  **********

export const actionUpdateAndGetDocuments = (optionsOfUpdate , optionsOfGet) => async (dispatch) => {
    
    // Update documents
    try {
        await dispatch(actionUpdateDocuments(optionsOfUpdate))

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED })
        console.log(error)
    }

    // Get documents
    try {
        await dispatch(actionGetDocuments(optionsOfGet))

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED })
        console.log(error)
    }
}

export const actionCreateAndGetDocuments = (optionsOfCreate , optionsOfGet) => async (dispatch) => {
    
    // Create document
    try {
        await dispatch(actionCreateDocument(optionsOfCreate))

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED })
        console.log(error)
    }

    // Get documents
    try {
        await dispatch(actionGetDocuments(optionsOfGet))

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED })
        console.log(error)
    }
}