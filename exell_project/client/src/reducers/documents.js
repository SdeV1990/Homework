import * as actionType from '../constants/actionTypes';

const documents = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_DOCUMENTS:

        return [...action.payload.data];

    case actionType.CREATE_DOCUMENT:
        
        state.push(action.payload)
        console.log('Create document status');
        console.log(state);
        return [...state];

    case actionType.DELETE_DOCUMENT:
        return action.payload.data.documents;

    // case CREATE:
    //   return [...posts, action.payload];

    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    default:
      return state;

  }
};

export default documents;