import * as actionType from '../constants/actionTypes';

const documents = (state = {status:'', list: [], recycledList: []}, action) => {
  switch (action.type) {
    
    // Fetch documents
    case actionType.FETCH_DOCUMENTS_SUCCESS:
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_SUCCESS, 
            list: [...action.payload.data]
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

    // Fetch recycled documents
    case actionType.FETCH_RECYCLED_DOCUMENTS_SUCCESS:
        console.log(action.payload.data)
        return {
            ...state, 
            status: actionType.FETCH_RECYCLED_DOCUMENTS_SUCCESS, 
            recycledList: [...action.payload.data]
        };

    case actionType.FETCH_RECYCLED_DOCUMENTS_PENDING:
        return {
            ...state, 
            status: actionType.FETCH_RECYCLED_DOCUMENTS_PENDING
        };

    case actionType.FETCH_RECYCLED_DOCUMENTS_REJECTED:
        return {
            ...state, 
            status: actionType.FETCH_RECYCLED_DOCUMENTS_REJECTED
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

    // Delete documents
    case actionType.DELETE_DOCUMENTS_SUCCESS:

        // Get documents ID list from document list
        const documentsIDAreDeleted = action.payload.data.map( document => document._id)

        // Remove deleted documents from list by ID list
        const newStateDocuments = state.list.filter( document => !documentsIDAreDeleted.includes(document._id) );

        return {
            ...state, 
            status: actionType.DELETE_DOCUMENTS_SUCCESS, 
            list: [...newStateDocuments]
        };

    case actionType.DELETE_DOCUMENTS_PENDING:
        return {
            ...state, 
            status: actionType.DELETE_DOCUMENTS_PENDING
        };

    case actionType.DELETE_DOCUMENTS_REJECTED:
        return {
            ...state, 
            status: actionType.DELETE_DOCUMENTS_REJECTED
        };

    // case CREATE:
    //   return [...posts, action.payload];

    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    default:
        return state;

  }
};

export default documents;