

// Calculate cells value
export const calculateCellsValue = (newData) => {
        
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
        else if ( newData[cell].formula != "" ) {

            // Check is value is number
            const isNumber = !isNaN(newData[cell].formula)

            // If value is number - convert from string into number
            if (isNumber) newData[cell].formula = +newData[cell].formula

            // Save value from formula
            newData[cell].value = newData[cell].formula
        }
        
        // Delete cell if formula is empty
        else {
            delete newData[cell]
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
                    })
                }
                
                // Calculate by formula
                try {

                    // If result is number - fixed result
                    if (typeof(eval(formula.slice(1))) === "number") {
                        newData[cell].value = +((eval(formula.slice(1))).toFixed(10))
                    } else {
                        newData[cell].value = eval(formula.slice(1))
                    }

                }
                catch {
                    newData[cell].value = "ERROR"
                    continue
                }
                
            }
            
        }
        
    // Repeat untill there is decreasing of number of cells to calculate and there ara at least cells to calculate
    } while (startNumberOfCellsToCalculate != countCellsToCalculate(newData) && countCellsToCalculate(newData) != 0)
    
    // If cells value is null it is mean, that there are cycled refferences
    for (let cell in newData) {
        if (newData[cell].value === null) newData[cell].value = 'CYCLED REFFERENCES'
    }

    // Save data to useState
    return {...newData}

    // // Save data to Redux (summon Chaos demons)
    // document.document.sheets[0].cells = {...data}
    // console.log(document.document.sheets[0])

};