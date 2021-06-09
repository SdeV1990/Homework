import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const actionGetDocuments = (getOptions) => async (dispatch) => {
    try {
        // Pending status
        dispatch({ type: actionType.FETCH_DOCUMENTS_PENDING});

        // Request to database
        const documents = await api.getDocuments(getOptions);

        console.log(documents)

        // Success status
        dispatch({ type: actionType.FETCH_DOCUMENTS_SUCCESS, payload: documents });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED });
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

export const actionOpenDocument = (documentsIDToOpen) => async (dispatch) => {
    try {

        // Pending status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_PENDING });

        // Open document in new tab
        window.open(`http://localhost:3000/document/${documentsIDToOpen.selectedDocuments[0]}`)
        
        // Success status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_SUCCESS });

    } catch (error) {

        // Rejected status
        dispatch({ type: actionType.OPEN_DOCUMENTS_NEW_TAB_REJECTED });
        console.log(error); 

    }
};

export const actionUpdateDocuments = (updateOptions) => async (dispatch) => {
    try {
        
        // Pending status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_PENDING });
        
        // Request to database
        const userState  = await api.updateDocuments(updateOptions);
        
        // Success status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_SUCCESS, payload: userState });

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED });
        console.log(error); 

    }
}

export const actionUpdateAndGetDocuments = (updateOptions , getOptions) => async (dispatch) => {
    try {
        
        // Update documents
        await dispatch(actionUpdateDocuments(updateOptions));

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED });
        console.log(error); 
    }

    try {
        
        // Get documents
        await dispatch(actionGetDocuments(getOptions));

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.FETCH_DOCUMENTS_REJECTED });
        console.log(error);
    }
}