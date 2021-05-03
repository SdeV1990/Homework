import * as actionType from '../constants/actionTypes';

const documents = (state = {status:'', list: []}, action) => {
  switch (action.type) {
    
    // Fetch documents
    case actionType.FETCH_DOCUMENTS_SUCCESS:
        return {status:'FETCH_DOCUMENTS_SUCCESS', list: [...action.payload.data]};

    case actionType.FETCH_DOCUMENTS_PENDING:
        return {status:'FETCH_DOCUMENTS_PENDING', list: [...state.list]};

    case actionType.FETCH_DOCUMENTS_REJECTED:
        return {status:'FETCH_DOCUMENTS_REJECTED', list: [...state.list]};

    // Create document
    case actionType.CREATE_DOCUMENT_SUCCESS:
        state.list.push(action.payload);
        return {...state, status:'CREATE_DOCUMENT_SUCCESS'};

    case actionType.CREATE_DOCUMENT_PENDING:
        return {...state, status:'CREATE_DOCUMENT_PENDING'};

    case actionType.CREATE_DOCUMENT_REJECTED:
        return {...state, status: 'CREATE_DOCUMENT_REJECTED'};

    // Delete documents
    case actionType.DELETE_DOCUMENT:
        const newStateDocuments = state.filter(document => document._id !== action.payload.data._id);
        return {status:'', list: [...newStateDocuments]};

    // case CREATE:
    //   return [...posts, action.payload];

    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    default:
      return state;

  }
};

export default documents;