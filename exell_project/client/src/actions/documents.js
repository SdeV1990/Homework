import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const actionGetDocuments = () => async (dispatch) => {
    try {
        // Pending status
        dispatch({ type: actionType.FETCH_DOCUMENTS_PENDING});

        // Request to database
        const documents = await api.getDocuments();

        // Success status
        dispatch({ type: actionType.FETCH_DOCUMENTS_SUCCESS, payload: documents });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED });
        console.log(error);

    }
}

export const actionGetRecycledDocuments = () => async (dispatch) => {
    try {
        // Pending status
        dispatch({ type: actionType.FETCH_RECYCLED_DOCUMENTS_PENDING});

        // Request to database
        const recycledDocuments = await api.getRecycledDocuments();

        // Success status
        dispatch({ type: actionType.FETCH_RECYCLED_DOCUMENTS_SUCCESS, payload: recycledDocuments });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.FETCH_RECYCLED_DOCUMENTS_REJECTED });
        console.log(error);

    }
}

export const actionCreateDocument = (newDocument) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.CREATE_DOCUMENT_PENDING});

        // Request to database
        const createdDocument  = await api.createDocument(newDocument);

        // Success status
        dispatch({ type: actionType.CREATE_DOCUMENT_SUCCESS, payload: createdDocument.data });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.CREATE_DOCUMENT_REJECTED });
        console.log(error); 

    }
}

// export const actionRecycleDocuments = (documentsIDToRecycle) => async (dispatch) => {
//     try {
        
//         // Pending status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_PENDING });

//         // Request to database
//         const userState  = await api.recycleDocuments(documentsIDToRecycle);
        
//         // Success status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_SUCCESS, payload: userState });

//     } catch (error) {

//         // Rejected status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_REJECTED });
//         console.log(error); 

//     }
// };

export const actionDeleteDocuments = (documentsIDToDelete) => async (dispatch) => {
    try {
        
        // Pending status
        dispatch({ type: actionType.DELETE_DOCUMENTS_PENDING });

        // Request to database
        const userState  = await api.deleteDocuments(documentsIDToDelete);
        
        // Success status
        dispatch({ type: actionType.DELETE_DOCUMENTS_SUCCESS, payload: userState });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.DELETE_DOCUMENTS_REJECTED });
        console.log(error); 

    }
}