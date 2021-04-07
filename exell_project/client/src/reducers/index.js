import { combineReducers } from 'redux';

import auth from './auth';
import documents from './documents';

export const reducers = combineReducers({ auth, documents });
