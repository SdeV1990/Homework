import * as actionType from '../constants/actionTypes';

const document = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_DOCUMENT:
        return action.payload.data.documents;
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

export default documents;