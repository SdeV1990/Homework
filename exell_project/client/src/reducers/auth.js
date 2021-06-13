import * as actionType from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {

    // Authorization
    if (action.type === actionType.AUTH) {

        // Save token in local storage
        localStorage.setItem('profile', JSON.stringify( !!action.data ? {...action.data} : null ))  //{ ...action?.data }

        return { ...state, authData: action.data, loading: false, errors: null }
    }

    // Log out
    if (action.type === actionType.LOGOUT) {
        localStorage.clear()

        return { ...state, authData: null, loading: false, errors: null }
    }

    return state
}

export default authReducer
