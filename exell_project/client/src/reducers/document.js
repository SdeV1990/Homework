import * as actionType from '../constants/actionTypes';
import { calculateCellsValue, convertNumberIndexIngoStringIndex, convertAddressToCoorginates, resizeCells } from '../maths/maths'

const document = (state = {}, action) => {

    // console.log('Reducer action:')
    // console.log(action)

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

    // Change cells value
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

    // Chenge cells sizes
    if (action.type === actionType.CHANGE_CELLS_SIZE) {

        const {resizedElement, cellID} = action

        console.log('reducer resizing')
        console.log('resized: ' + cellID)
        console.log(resizedElement.style.height)
        console.log(convertAddressToCoorginates(cellID))

        // Get current sheet status
        const currentSheet = state.document.sheets[0]

        // Create parameters for creation a new arrays of size (rowHeight, columnWidth)
        const parameters = {

            // Adress of resized cell
            cellID,

            // Size (height, width) of resized cell
            newHeight: resizedElement.style.height,
            newWidth: resizedElement.style.width,

            // Default sizes (height, width)
            rowDefaultHeight: currentSheet.rowDefaultHeight,
            columnDefaultWidth: currentSheet.columnDefaultWidth,

            // Old arrays of sizes
            rowHeight: currentSheet.rowHeight,
            columnWidth: currentSheet.columnWidth,

        }

        // Function recieved:
        //   * adress of resized cell;
        //   * size (width, height) of resized cell;
        //   * default sizes (width, height);
        //   * old arrays of sizes (array of columns width and array of rows heigth);
        // Funciton returns new arrays of sizes.
        const { newRowHeight , newColumnWidth } = resizeCells(parameters)
        
        // Create new state
        let newState = {...state}
        newState.document.sheets[0].rowHeight = {...newRowHeight}
        newState.document.sheets[0].columnWidth = {...newColumnWidth}

        console.log(newState)

        return { ...newState };

    }




















    // Else
    return state;

}

export default document;