import * as actionType from '../constants/actionTypes';

const document = (state = [], action) => {
  switch (action.type) {

    // Open document
    // case actionType.OPEN_DOCUMENT_PENDING:
    //     return action.payload.data;

    case actionType.OPEN_DOCUMENT_SUCCESS:

        console.log('action.payload')
        console.log(action.payload)

        return {
            ...state, 
            document: action.payload,
            status: actionType.OPEN_DOCUMENT_SUCCESS
        };

    // case actionType.OPEN_DOCUMENT_REJECTED:
    //     return action.payload.data.documents;






    // case actionType.CREATE_DOCUMENT:
    //     return action.payload.data.documents;
    // case actionType.DELETE_DOCUMENT:
    //     return action.payload.data.documents;
    // case CREATE:
    //   return [...posts, action.payload];
    // case UPDATE:
    //   return posts.map( (post) => (post._id === action.payload._id ? action.payload : post) );
    default:
      return state;
  }
};

export default document;