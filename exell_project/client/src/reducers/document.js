import * as actionType from '../constants/actionTypes';
import { calculateCellsValue } from '../maths/maths'

const document = (state = {}, action) => {

    // Open document
    if (action.type === actionType.OPEN_DOCUMENT_SUCCESS) {

        return {
            ...state, 
            document: action.payload,
            status: actionType.OPEN_DOCUMENT_SUCCESS
        };

    }

    // Calculate cells value
    if (action.type === actionType.CALCULATE_CELLS_VALUE) {
        
        // Using math to calculate cells value
        let newCells = calculateCellsValue(state.document.sheets[0].cells)
        
        // Creat new state
        let newState = {...state}
        newState.document.sheets[0].cells = {...newCells}

        return {...newState}

    }

    if (action.type === actionType.CHANGE_CELLS_VALUE) {

        const {event, cellID} = action

        let newCells = state.document.sheets[0].cells

        // If value is empty - delete key
        if (event.target.value === "") {
            delete newCells[cellID]
        } else {
            
            // If there is no key in data object - create it
            if (newCells[cellID] === undefined ) {

                // Create cell
                newCells[cellID] = {
                    formula: event.target.value,
                    value: null
                }

            // If cell is exist - just save value into formula
            } else {
                newCells[cellID].formula = event.target.value
            }
            
        }

        // Create new state
        let newState = {...state}
        newState.document.sheets[0].cells = newCells

        return { ...newState };

    }

    // Else
    return state;

}

export default document;