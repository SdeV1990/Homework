import * as actionType from '../constants/actionTypes'

const documents = (state = {status:'', list: [], recycledList: []}, action) => {
    // console.log('Reducer documentS state: ' + state)
    // console.log('Reducer documentS action.payload: ' + action.payload)
    
    // Fetch documents
    if(action.type ===  actionType.FETCH_DOCUMENTS_SUCCESS) {
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_SUCCESS, 
            list: [...action.payload.data.filter(document => document.isRecycled === false)],
            recycledList: [...action.payload.data.filter(document => document.isRecycled === true)]
        }
    }

    if(action.type ===  actionType.FETCH_DOCUMENTS_PENDING) {
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_PENDING
        }
    }

    if(action.type ===  actionType.FETCH_DOCUMENTS_REJECTED) {
        return {
            ...state, 
            status: actionType.FETCH_DOCUMENTS_REJECTED
        }
    }

        
    // Create document
    if(action.type ===  actionType.CREATE_DOCUMENT_SUCCESS) {
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_SUCCESS
        }
    }

    if(action.type ===  actionType.CREATE_DOCUMENT_PENDING) {
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_PENDING
        }
    }

    if(action.type === actionType.CREATE_DOCUMENT_REJECTED) {
        return {
            ...state, 
            status: actionType.CREATE_DOCUMENT_REJECTED
        }
    }

    // Update documents
    if(action.type === actionType.UPDATE_DOCUMENTS_SUCCESS) {
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_SUCCESS,
        }
    }
        
    if(action.type === actionType.UPDATE_DOCUMENTS_PENDING) {
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_PENDING
        }
    }
        
    if(action.type === actionType.UPDATE_DOCUMENTS_REJECTED) {
        return {
            ...state, 
            status: actionType.UPDATE_DOCUMENTS_REJECTED
        }
    }

    return state

}

export default documents