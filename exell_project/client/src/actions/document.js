import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getDocument = (docID) => async (dispatch) => {
    try {
        const userState = await api.getDocument(docID);

        // console.log(`User state: ${userState}`)
        
        // dispatch({ type: actionType.FETCH_DOCUMENTS, payload: userState });
    } catch (error) {
        console.log(error);
    }
};