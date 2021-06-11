import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

// Load document from server
export const getDocument = (documentId) => async (dispatch) => {
    try {

        // Pending status
        dispatch({type: actionType.OPEN_DOCUMENT_PENDING});

        // Get document data
        const response = await api.getDocument({documentId})
        
        // Success status
        dispatch({ type: actionType.OPEN_DOCUMENT_SUCCESS, payload: response.data });

    } catch (error) {

        console.log(error);
    }
};

// Calculate cells value
export const actionCalculateCellsValue = () => async (dispatch) => {
    try {

        // Calculate
        await dispatch({type: actionType.CALCULATE_CELLS_VALUE});
        
    } catch (error) {
        console.log(error);
    }
};

// Change value of selected cell
export const actionChangeCellValue = (event, cellID) => async (dispatch) => {
    try {

        // Calculate
        await dispatch({
            type: actionType.CHANGE_CELLS_VALUE,
            event,
            cellID
        });
        
    } catch (error) {
        console.log(error);
    }
};

// Change cells size
export const actionChangeCellsSize = (resizedElement, cellID) => async (dispatch) => {
    try {

        // Resizing
        await dispatch({
            type: actionType.CHANGE_CELLS_SIZE,
            resizedElement,
            cellID
        });

    } catch (error) {
        console.log(error);
    }
};