// Calculate cells value
export const calculateCellsValue = (newData, cellsForRender) => {
    
    // Check cells formula for formula or value
    let cellsWithFormula = {}
    for (let cell in newData) {
        
        // Get all cells with formulas
        if ( String(newData[cell].formula).startsWith("=") && String(newData[cell].formula).length > 1 ) {

            // Add value if it isn't exist
            if (newData[cell].value === undefined) newData[cell] = {...newData[cell], value: null}

            // Copy cell into array of cells with formulas
            cellsWithFormula[cell] = {...newData[cell]}

        }
        
        // Save value if it isn't formula
        else if ( newData[cell].formula !== "" ) {

            // Check is value is number
            const isNumber = !isNaN(newData[cell].formula)

            // If value is number - convert from string into number
            if (isNumber) newData[cell].formula = +newData[cell].formula

            // Save value from formula for cells and cells for render
            newData[cell].value = newData[cell].formula
            cellsForRender[cell] = newData[cell].formula

        }
        
        // Delete cell if formula is empty
        else {
            delete newData[cell]
            delete cellsForRender[cell]
        } 
    }

    // Count cells which is needed to calculate
    const countCellsToCalculate = (cells) => {
        let numberCellsToCalculate = 0
        for (let cellToCheck in newData) {

            // If cell value is undefined - create it
            if ( 
                newData[cellToCheck].value === null 
                && String(newData[cellToCheck].formula).startsWith("=") 
                && String(newData[cellToCheck].formula).length > 1 
            ) {
                numberCellsToCalculate++
            }
        }

        return numberCellsToCalculate
    }

    // Clear all values in cells with formulas to calculate lately
    for (let cell in cellsWithFormula) {
        cellsWithFormula[cell].value = null
        newData[cell].value = null
    }

    // Calculate cells value
    const REGEX_ADDRESS = /([A-Z]+\d+)/g
    let startNumberOfCellsToCalculate 
    do {
        
        // Remember start number
        startNumberOfCellsToCalculate = countCellsToCalculate(newData)

        // If thera are no cells to calculate - break
        if (startNumberOfCellsToCalculate === 0) break

        for (let cell in cellsWithFormula) {
            
            // Use regular expression to get array of address of cells
            let cellsAddress = cellsWithFormula[cell].formula.match(REGEX_ADDRESS)
            
            // Get cell value if they are exists
            let isNotNull = false
            if (cellsAddress !== null) {

                // 
                let cellValues = cellsAddress.map( cellAddress => {
                    return newData[cellAddress] === undefined ? "" : newData[cellAddress].value
                })
                
                // Check cellsValue for not nul
                cellValues.map(cellValue => isNotNull = (cellValue === null || isNotNull))
                
            }
            
            // Calculate if all values are calculated
            if (!isNotNull) {
                
                // Replace cell address with cell value by formula
                let formula = newData[cell].formula

                // If cells addresses exist
                if (cellsAddress !== null) {

                    // For each related cell
                    cellsAddress.map( relatedCell => {

                        // Is needed cell exists
                        const isCellExist = newData[relatedCell] !== undefined
                        if (isCellExist === true) {

                            // Check is value is number
                            const isNumber = !isNaN(newData[relatedCell].value)

                            // If value is number - convert from string into number
                            if (isNumber === true) newData[relatedCell].value = +newData[relatedCell].value

                        }

                        // Replace cell address to object (string link)
                        formula = formula.replace(
                            relatedCell, 
                            isCellExist === true ? `newData.${relatedCell}.value` : 0 
                        )

                        return formula
                    })
                }
                
                // Calculate by formula
                try {


                    // If result is number - fixed result
                    if (typeof(eval(formula.slice(1))) === "number" ) {

                        // If result is NaN - throw error
                        if (isNaN(eval(formula.slice(1)))) {
                            throw new Error('Result is not a number.')
                        }

                        newData[cell].value = +((eval(formula.slice(1))).toFixed(10))
                        cellsForRender[cell] = +((eval(formula.slice(1))).toFixed(10))

                    // If reuslt is not a number or NaN
                    } else {

                        newData[cell].value = String(eval(formula.slice(1)))
                        cellsForRender[cell] = String(eval(formula.slice(1)))

                    }

                }
                catch(error) {

                    console.log(error)
                    newData[cell].value = "ERROR"
                    cellsForRender[cell] = "ERROR"
                    continue

                }
                
            }
            
        }
        
    // Repeat untill there is decreasing of number of cells to calculate and there ara at least cells to calculate
    } while (startNumberOfCellsToCalculate !== countCellsToCalculate(newData) && countCellsToCalculate(newData) !== 0)
    
    // If cells value is null it is mean, that there are cycled refferences
    for (let cell in newData) {
        if (newData[cell].value === null) {
            newData[cell].value = 'CYCLED'
            cellsForRender[cell] = 'CYCLED'
        }
    }

    // Save data to useState
    return {...newData}

};

// Convert decimal index into string [A-Z] index 
export const convertNumberIndexIngoStringIndex = (number) => {
    
    const CHAR_CODE_OFFSET = 65
    const CHAR_NUMBER_BASE = 26
    
    // Get number
    let result = []
    let remainder = number
    let charIndex = 0
    
    // Convert into char index array
    do {
        charIndex = (remainder - 1) % CHAR_NUMBER_BASE
        result.unshift(charIndex + CHAR_CODE_OFFSET)
        remainder = (remainder - 1 - charIndex) / CHAR_NUMBER_BASE
    } while (remainder > 0)
    
    // Convert char index array into char array
    result = result.map(char => String.fromCharCode(char) )

    // Concatenate all items
    result = result.join("")

    return result

}

// Converting address to coordinates - column and row indexes
export const convertAddressToCoorginates = (string) => {
    
    let coordinates = {
      row: 0,
      column: 0
    }
    
    // Get columnt address
    const regexColumn = /[A-Z]+/g
    const columnAddress = RegExp(regexColumn).exec(string)[0]
    
    // Get row aderess
    const regexRow = /[0-9]+/g
    const rowAddress = regexRow.exec(string)[0]
    
    // Show result
    coordinates.row = +rowAddress
    coordinates.column = columnAddress
    return coordinates
    
}

// Convert string [A-Z] index into decimal index
export const convertStringIndexIntoNumber = (string) => {
  
    let result = 0
    
    // Quantity of iteraiton is the length of string
    for (let charIndex = string.length; charIndex > 0; charIndex-- ) {
        result += Math.pow(26, string.length-charIndex)*(string[charIndex-1].charCodeAt()-64)
    }

    return result
}


// Resizing cells
// Function recieved:
//   * adress of resized cell;
//   * size (width, height) of resized cell;
//   * default sizes (width, height);
//   * old arrays of sizes (array of columns width and array of rows heigth);
// Funciton returns new arrays of sizes.
export const resizeCells = (parameters) => {
    
    // console.log('Resizing math starts.')
    // console.log(parameters)
    
    // Get parameters
    const {

        // Adress of resized cell
        cellID,

        // Size (height, width) of resized cell
        newHeight, newWidth,

        // Default sizes (height, width)
        rowDefaultHeight, columnDefaultWidth,

        // Old arrays of sizes
        rowHeight, columnWidth,

    } = parameters
    

    // Get current element coordinates
    const currenElementCoordinates = convertAddressToCoorginates(cellID)

    
    // Create array of rows height

    // If new row height isn't equal to default value - save it
    if ( +newHeight.slice(0, -2) !== +rowDefaultHeight ) {
        rowHeight[currenElementCoordinates.row] = +newHeight.slice(0, -2)

    // If new row height is equal to default value and old row height is already exist - old delete row height
    } else if ( rowHeight[currenElementCoordinates.row] !== undefined ) {
        delete rowHeight[currenElementCoordinates.row]
    }


    // Create array of columns width

    // If new column width isn't equal to default value - save it
    if ( +newWidth.slice(0, -2) !== +columnDefaultWidth ) {
        columnWidth[currenElementCoordinates.column] = +newWidth.slice(0, -2)

    // If new column width is equal to default value and old column width is already exist - delete old column width
    } else if ( columnWidth[currenElementCoordinates.column] !== undefined ) {
        delete columnWidth[currenElementCoordinates.column]
    }
    
    // Create result
    return {
        newRowHeight: {...rowHeight},
        newColumnWidth: {...columnWidth},
    }

}