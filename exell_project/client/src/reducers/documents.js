import * as actionType from '../constants/actionTypes';

const documents = (state = {status:'', list: [], recycledList: []}, action) => {
    console.log(state)
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
        
    // // Recycle documents
    // case actionType.RECYCLE_DOCUMENTS_SUCCESS:

    //     // Get documents ID list from document list
    //     const documentsIDAreRecycled = action.payload.data.map( document => document._id )

    //     // Remove deleted documents from list by ID list
    //     const newStateDocumentsWithoutRecycled = state.list.filter( document => !documentsIDAreRecycled.includes(document._id) );
        
    //     return {
    //         ...state, 
    //         status: actionType.RECYCLE_DOCUMENTS_SUCCESS, 
    //         list: [...newStateDocumentsWithoutRecycled],
    //         recycledList: [...state.recycledList, ...action.payload.data]
    //     };

    // case actionType.RECYCLE_DOCUMENTS_PENDING:
    //     return {
    //         ...state, 
    //         status: actionType.RECYCLE_DOCUMENTS_PENDING
    //     };

    // case actionType.RECYCLE_DOCUMENTS_REJECTED:
    //     return {
    //         ...state, 
    //         status: actionType.RECYCLE_DOCUMENTS_REJECTED
    //     };

    // // Restore documents
    // case actionType.RESTORE_DOCUMENTS_SUCCESS:
        
    //     // Add restored documents to list by ID list
    //     const newStateDocumentsWithRestored = state.list = [...state.list, ...action.payload.data] //
        
    //     // Get documents ID list from document list
    //     const documentsIDAreRestored = action.payload.data.map( document => document._id )

    //     // Delete restored documents from recycled list by ID
    //     const newStateRecycledDocumentsWithoutRestored = state.recycledList.filter( document => !documentsIDAreRestored.includes(document._id) );

    //     return {
    //         ...state, 
    //         status: actionType.RESTORE_DOCUMENTS_SUCCESS, 
    //         list: [...newStateDocumentsWithRestored],
    //         recycledList: [...newStateRecycledDocumentsWithoutRestored]
    //     };

    // case actionType.RESTORE_DOCUMENTS_PENDING:
    //     return {
    //         ...state, 
    //         status: actionType.RESTORE_DOCUMENTS_PENDING
    //     };

    // case actionType.RESTORE_DOCUMENTS_REJECTED:
    //     return {
    //         ...state, 
    //         status: actionType.RESTORE_DOCUMENTS_REJECTED
    //     };

    // // Delete documents
    // case actionType.DELETE_DOCUMENTS_SUCCESS:

    //     // Get documents ID list from document list
    //     const documentsIDAreDeleted = action.payload.data.map( document => document._id)

    //     // Remove deleted documents from list by ID list
    //     const newStateDocumentsWithoutDeleted = state.recycledList.filter( document => !documentsIDAreDeleted.includes(document._id) );

    //     return {
    //         ...state, 
    //         status: actionType.DELETE_DOCUMENTS_SUCCESS, 
    //         recycledList: [...newStateDocumentsWithoutDeleted]
    //     };

    // case actionType.DELETE_DOCUMENTS_PENDING:
    //     return {
    //         ...state, 
    //         status: actionType.DELETE_DOCUMENTS_PENDING
    //     };

    // case actionType.DELETE_DOCUMENTS_REJECTED:
    //     return {
    //         ...state, 
    //         status: actionType.DELETE_DOCUMENTS_REJECTED
    //     };
                    
    // case CREATE:
    //   return [...posts, action.payload];

    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    default:
        return state;

  }
};

export default documents;