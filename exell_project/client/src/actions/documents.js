import { FETCH_DOCUMENTS, CREATE_DOCUMENT, DELETE_DOCUMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getDocuments = () => async (dispatch) => {
    try {
        const userState = await api.getDocuments();

        // console.log(`User state: ${userState}`)
        
        dispatch({ type: FETCH_DOCUMENTS, payload: userState });
    } catch (error) {
        console.log(error);
    }
};

export const createDocument = (newDocument) => async (dispatch) => {
    try {
        console.log(newDocument)
        const userState  = await api.createDocument(newDocument);
    
        // console.log(`User state: ${userState}`)

        dispatch({ type: CREATE_DOCUMENT, payload: userState });
    } catch (error) {
        console.log(error); 
    }
};

export const deleteDocument = (documentIDToDelete) => async (dispatch) => {
    try {
        console.log(documentIDToDelete);
        const userState  = await api.deleteDocument(documentIDToDelete);
    
        // console.log(userState)
        
        dispatch({ type: DELETE_DOCUMENT, payload: userState });
    } catch (error) {
        console.log(error); 
    }
};