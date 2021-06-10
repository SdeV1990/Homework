import * as actionType from '../constants/actionTypes';
import { calculateCellsValue } from '../maths/maths'

const document = (state = {}, action) => {

    // console.log('Dispatch')
    // console.log(action.type)

    if (action.type === actionType.OPEN_DOCUMENT_SUCCESS) {

        console.log('action.payload')
        console.log(action.payload)

        return {
            ...state, 
            document: action.payload,
            status: actionType.OPEN_DOCUMENT_SUCCESS
        };

    }

    if (action.type === actionType.CALCULATE_CELLS_VALUE) {

        let newCells = calculateCellsValue(state.document.sheets[0].cells)

        let newState = {...state}
        newState.document.sheets[0].cells = {...newCells}

        return {
            ...newState, 
        };

    }

    if (action.type === actionType.CHANGE_CELLS_VALUE) {

        const event = action.event
        const cellID = action.cellID

        let newCells = state.document.sheets[0].cells

        console.log(newCells)

        // If value is empty - delete key
        if (event.target.value === "") {
            delete newCells[cellID]
        } else {
            
            // If there is no key in data object - create it
            if (newCells[cellID] === undefined ) {
                newCells[cellID] = {...newCells, [cellID]: {formula: event.target.value} }
            } else {
                newCells[cellID].formula = event.target.value
            }
            
        }

        let newState = {...state}
        newState.document.sheets[0].cells = newCells

        return {
            ...newState, 
        };

    }

    // Else
    return state;

}

export default document;