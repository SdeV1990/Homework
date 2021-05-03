import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const actionGetDocuments = () => async (dispatch) => {
    try {
        // Pending status
        dispatch({type: actionType.FETCH_DOCUMENTS_PENDING});

        // Request to database
        const documents = await api.getDocuments();

        // Success status
        dispatch({ type: actionType.FETCH_DOCUMENTS_SUCCESS, payload: documents });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED });
        console.log(error);

    }
};

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
};

export const actionDeleteDocument = (documentIDToDelete) => async (dispatch) => {
    try {
        console.log(documentIDToDelete);
        const userState  = await api.deleteDocument(documentIDToDelete);
    
        console.log(userState)
        
        dispatch({ type: actionType.DELETE_DOCUMENT, payload: userState });
    } catch (error) {
        console.log(error); 
    }
};