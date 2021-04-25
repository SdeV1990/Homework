import * as actionType from '../constants/actionTypes';

const documents = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_DOCUMENTS:
        return [...action.payload.data];

    case actionType.CREATE_DOCUMENT:
        state.push(action.payload);
        return [...state];

    case actionType.DELETE_DOCUMENT:
        const newState = state.filter(document => document._id !== action.payload.data._id);
        return [...newState];

    // case CREATE:
    //   return [...posts, action.payload];

    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    default:
      return state;

  }
};

export default documents;