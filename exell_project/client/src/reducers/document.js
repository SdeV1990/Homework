import * as actionType from '../constants/actionTypes';
import { calculateCellsValue, convertNumberIndexIngoStringIndex, convertAddressToCoorginates } from '../maths/maths'

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

    // Set cells sizes
    if (action.type === actionType.CHANGE_CELLS_SIZE) {

        const {event, cellID} = action

        console.log('reducer resizing')
        console.log('resized: ' + cellID)
        console.log(event.target.style.height)
        console.log(convertAddressToCoorginates(cellID))
    
        //Get current element
        const element = event.target
        
        // Get current cell size
        let {width, height} = element.style
    
        // Constants
        // const MAX_ROWS = !!document.document ? document.document.sheets[0].rowQuantity : 1
        // const MAX_COLUMNS = !!document.document ? document.document.sheets[0].columnQuantity : 1
        
        // // Get current cell id
        // const currentCellID = element.id
    
        // // Get current element coordinates
        // const currenElementCoordinates = convertAddressToCoorginates(currentCellID)
    
        // // Create array of rows address to resize
        // let rowsArrayToResize = []
        // for (let index = 1; index<=MAX_ROWS; index++) {
        //     rowsArrayToResize.push( convertNumberIndexIngoStringIndex(index)  + currenElementCoordinates.row)
        // }
        
        
        // console.log("Height")
        // console.log(+height.slice(0, -2))
        
        // // Resize rows height
        // console.log('Resize')
        // console.log(rows[1].props.children[1].props.children[0].props.style.height)
        // rows[1].props.children[1].props.children[0].props.style.height = 60
        // rowsArrayToResize.map( address => {
        //     rows[1].props.children[1].props.children[0].props.style.height = height
        // })
    
        // console.log(rowsArrayToResize)
        // debugger
        
        // // Create array of column address to resize
        // let columnArrayToResize = []
        // for (let index = 1; index<=MAX_COLUMNS; index++) {
        //     columnArrayToResize.push( currenElementCoordinates.column + index)
        // }
        
        // // Resize column width
        // columnArrayToResize.map( address => {
        //     document.getElementById(address).style.width = width
        // })












        // // Create new state
        // let newState = {...state}
        // newState.document.sheets[0].cells = newCells

        // return { ...newState };

    }




















    // Else
    return state;

}

export default document;