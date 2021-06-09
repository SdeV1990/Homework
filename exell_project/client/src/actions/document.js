import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getDocument = (documentId) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.OPEN_DOCUMENT_PENDING});

        const response = await api.getDocument({documentId})
        
        dispatch({ type: actionType.OPEN_DOCUMENT_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
    }
};

export const actionResizeCells = (cellID) => async (dispatch) => {
    // try {








    //     // Pending status
    //     dispatch({type: actionType.OPEN_DOCUMENT_PENDING});

    //     const response = await api.getDocument({documentId})
        
    //     dispatch({ type: actionType.OPEN_DOCUMENT_SUCCESS, payload: response.data });
    // } catch (error) {
    //     console.log(error);
    // }
};