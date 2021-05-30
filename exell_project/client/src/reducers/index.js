import { combineReducers } from 'redux'

import auth from './auth'
import documents from './documents'
import document from './document'

export const reducers = combineReducers({ auth, documents, document });
