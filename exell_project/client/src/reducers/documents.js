import * as actionType from '../constants/actionTypes';

const documents = (state = {status:'', list: [], recycledList: []}, action) => {
    console.log(state)
  switch (action.type) {
    
    // Fetch documents
    case actionType.FETCH_DOCUMENTS_SUCCESS:
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_SUCCESS, 
            list: [...action.payload.data.filter(document => document.isRecycled === false)],
            recycledList: [...action.payload.data.filter(document => document.isRecycled === true)]
        };

    case actionType.FETCH_DOCUMENTS_PENDING:
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_PENDING
        };

    case actionType.FETCH_DOCUMENTS_REJECTED:
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_REJECTED
        };

        
    // Create document
    case actionType.CREATE_DOCUMENT_SUCCESS:
        state.list.push(action.payload);
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_SUCCESS
        };

    case actionType.CREATE_DOCUMENT_PENDING:
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_PENDING
        };

    case actionType.CREATE_DOCUMENT_REJECTED:
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_REJECTED
        };

        
    // Update documents
    case actionType.UPDATE_DOCUMENTS_SUCCESS:
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_SUCCESS,
        };
        
    case actionType.UPDATE_DOCUMENTS_PENDING:
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_PENDING
        };
        
    case actionType.UPDATE_DOCUMENTS_REJECTED:
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_REJECTED
        };

    default:
        return state;

  }
};

export default documents;