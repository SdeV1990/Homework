import * as actionType from '../constants/actionTypes'
import * as api from '../api/index.js'

// ********** Single actions **********

// Load document from server
export const getDocument = (documentId) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.OPEN_DOCUMENT_PENDING})

        // Get document data
        const response = await api.getDocument({documentId})
        
        // Success status
        dispatch({ type: actionType.OPEN_DOCUMENT_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error)
    }
}

// Calculate cells value
export const actionCalculateCellsValue = () => async (dispatch) => {
    try {

        // Calculate
        await dispatch({type: actionType.CALCULATE_CELLS_VALUE})
        
    } catch (error) {
        console.log(error)
    }
}

// Change value of selected cell
export const actionChangeCellValue = (event, cellID) => async (dispatch) => {
    try {

        // Calculate
        await dispatch({
            type: actionType.CHANGE_CELLS_VALUE,
            event,
            cellID
        })
        
    } catch (error) {
        console.log(error)
    }
}

// Change cells size
export const actionChangeCellsSize = (resizedElement, cellID) => async (dispatch) => {
    try {

        // Resizing
        await dispatch({
            type: actionType.CHANGE_CELLS_SIZE,
            resizedElement,
            cellID
        })

    } catch (error) {
        console.log(error)
    }
}

// Save document
export const actionSaveDocument = (documentToSave) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.SAVE_DOCUMENT_PENDING})

        // Get document data
        const response = await api.saveDocument({documentToSave})
        
        // Success status
        dispatch({ type: actionType.SAVE_DOCUMENT_SUCCESS, payload: response.data })

    } catch (error) {

        // Rejected status
        console.log(error)
        dispatch({ type: actionType.SAVE_DOCUMENT_REJECTED})

    }
}


// ********** Double actions  **********

// Get document and calculate cells value
export const actionGetDocumentAndCalculateCellsValue = (documentId) => async (dispatch) => {
    
    // Get document
    try {
        await dispatch(getDocument(documentId))

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.OPEN_DOCUMENT_REJECTED })
        console.log(error)
    }

    // Calculate cells value
    try {
        await dispatch(actionCalculateCellsValue())

    } catch (error) {
        
        // Rejected status
        // dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED })
        console.log(error)
    }
}

// // Save document and get it
// export const actionSaveDocumentAndGetDocument = (documentToSave) => async (dispatch) => {
    
//     // Calculate cells value
//     try {
//         await dispatch(actionSaveDocument(documentToSave))

//         console.log('Document to save')
//         console.log(documentToSave)

//     } catch (error) {
        
//         // Rejected status
//         // dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED })
//         console.log(error)
//     }

//     // Get document
//     try {
//         await dispatch(getDocument(documentToSave.document._id))

//     } catch (error) {
        
//         // Rejected status
//         // dispatch({ type: actionType.OPEN_DOCUMENT_REJECTED })
//         console.log(error)
//     }
// }