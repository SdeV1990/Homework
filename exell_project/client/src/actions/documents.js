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

export const actionReadDocuments = (readOptions) => async (dispatch) => {
    try {
        
        // Pending status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_PENDING });
        
        // Request to database
        const userState  = await api.updateDocuments(readOptions);
        
        // Success status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_SUCCESS, payload: userState });

    } catch (error) {
        
        // Rejected status
        dispatch({ type: actionType.UPDATE_DOCUMENTS_REJECTED });
        console.log(error); 

    }
}


// export const actionRecycleDocuments = (documentsIDToRecycle) => async (dispatch) => {
//     try {
        
//         // Pending status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_PENDING });

//         //Set update
//         const update = {
//             selectedDocuments: [...documentsIDToRecycle.selectedDocuments], 
//             updateType: "RECYCLE"
//         }

//         // Request to database
//         const userState  = await api.updateDocuments(update);
        
//         // Success status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_SUCCESS, payload: userState });

//     } catch (error) {

//         // Rejected status
//         dispatch({ type: actionType.RECYCLE_DOCUMENTS_REJECTED });
//         console.log(error); 

//     }
// };

// export const actionRestoreDocuments = (documentsIDToRestore) => async (dispatch) => {
//     try {
        
//         // Pending status
//         dispatch({ type: actionType.RESTORE_DOCUMENTS_PENDING });

//         //Set update
//         const update = {
//             selectedDocuments: [...documentsIDToRestore.selectedDocuments], 
//             updateType: "RESTORE"
//         }

//         // Request to database
//         const userState  = await api.updateDocuments(update);

//         // Success status
//         dispatch({ type: actionType.RESTORE_DOCUMENTS_SUCCESS, payload: userState });

//     } catch (error) {

//         // Rejected status
//         dispatch({ type: actionType.RESTORE_DOCUMENTS_REJECTED });
//         console.log(error); 

//     }
// };

// export const actionDeleteDocuments = (documentsIDToDelete) => async (dispatch) => {
//     try {
        
//         // Pending status
//         dispatch({ type: actionType.DELETE_DOCUMENTS_PENDING });

//         //Set update
//         const update = {
//             selectedDocuments: [...documentsIDToDelete.selectedDocuments], 
//             updateType: "DELETE"
//         }

//         // Request to database
//         const userState  = await api.updateDocuments(update);
        
//         // Success status
//         dispatch({ type: actionType.DELETE_DOCUMENTS_SUCCESS, payload: userState });

//     } catch (error) {

//         // Rejected status
//         dispatch({ type: actionType.DELETE_DOCUMENTS_REJECTED });
//         console.log(error); 

//     }
// }