import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const actionGetDocuments = () => async (dispatch) => {
    try {
        const documents = await api.getDocuments();

        dispatch({ type: actionType.FETCH_DOCUMENTS, payload: documents });
    } catch (error) {
        console.log(error);
    }
};

export const actionCreateDocument = (newDocument) => async (dispatch) => {
    try {
        const createdDocument  = await api.createDocument(newDocument);

        dispatch({ type: actionType.CREATE_DOCUMENT, payload: createdDocument.data });
    } catch (error) {
        console.log(error); 
    }
};

export const actionDeleteDocument = (documentIDToDelete) => async (dispatch) => {
    try {
        console.log(documentIDToDelete);
        const userState  = await api.deleteDocument(documentIDToDelete);
    
        // console.log(userState)
        
        dispatch({ type: actionType.DELETE_DOCUMENT, payload: userState });
    } catch (error) {
        console.log(error); 
    }
};