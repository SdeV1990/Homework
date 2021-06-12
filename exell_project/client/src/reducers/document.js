import * as actionType from '../constants/actionTypes';
import { calculateCellsValue, resizeCells, createCellsForRender } from '../maths/maths'

const document = (state = {}, action) => {

    console.log('Reducer action payload:')
    console.log(action.payload)
    console.log(action.type)

    // Open document
    if (action.type === actionType.OPEN_DOCUMENT_SUCCESS) {

        // Get data from server response payload
        let newState = {
            ...state, 
            document: action.payload,
            status: actionType.OPEN_DOCUMENT_SUCCESS
        }

        // Create cells for render
        const cellsForRender = createCellsForRender({
            cells: {...newState.document.sheets[0].cells},
            rowQuantity: newState.document.sheets[0].rowQuantity, 
            columnQuantity: newState.document.sheets[0].columnQuantity,
        })
        
        // Set cells for render in new state
        newState.document.sheets[0].cellsForRender = { ...cellsForRender}
        
        return newState;

    }

    // Calculate cells value
    if (action.type === actionType.CALCULATE_CELLS_VALUE) {

        // Using math to calculate cells value
        let newCells = calculateCellsValue( // returns copy
            state.document.sheets[0].cells,
            state.document.sheets[0].cellsForRender // By ref - cells for rendering are updated inside function
        )
        
        // Set calculated cells in new state
        let newState = {...state}
        newState.document.sheets[0].cells = {...newCells}

        return {...newState}

    }

    // Change cells value
    if (action.type === actionType.CHANGE_CELLS_VALUE) {

        // Get parameters
        const {event, cellID} = action
        
        let newCells = state.document.sheets[0].cells

        // If value is empty - delete key in new cells and clear value in cells for render
        if (event.target.value === "") {

            // Delete ket in new cells
            delete newCells[cellID]

            // Clear value in cells for render
            state.document.sheets[0].cellsForRender[cellID] = null

        // If value isn't empty
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

            // Replace data in cells for rendering
            state.document.sheets[0].cellsForRender[cellID] = event.target.value
            // state.document.sheets[0].cellsForRender[cellID] = null

        }

        // Set cells with changed value in new state
        let newState = {...state}
        newState.document.sheets[0].cells = {...newCells}


        console.log('newState')
        console.log({...newState.document.sheets[0]})

        return { ...newState };

    }

    // Change cells sizes
    if (action.type === actionType.CHANGE_CELLS_SIZE) {

        const {resizedElement, cellID} = action

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
        const { newRowHeight, newColumnWidth } = resizeCells(parameters)
        
        // Create new state
        let newState = {...state}
        newState.document.sheets[0].rowHeight = {...newRowHeight}
        newState.document.sheets[0].columnWidth = {...newColumnWidth}

        return { ...newState };

    }

    // Else
    return state;

}

export default document;