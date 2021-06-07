import React, { useState, useEffect } from 'react'
import { getDocument } from '../../actions/document'
import { connect } from 'react-redux'

// Material UI
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

// Material UI icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

// *********** Maths begins ***********

// Converting adress to coordinates - column and row indexes
function convertAdressToCoorginates(string) {
  
    let coordinates = {
      row: 0,
      column: 0
    }
    
    // Get columnt adress
    const regexColumn = /[A-Z]+/g
    const columnAdress = RegExp(regexColumn).exec(string)[0]
  
    // Get row aderess
    const regexRow = /[0-9]+/g
    const rowAdress = regexRow.exec(string)[0]
    
    // Show result
    coordinates.row = +rowAdress
    coordinates.column = columnAdress
    return coordinates
    
  }

// *********** Maths ends ***********

const Document = ( { document, getDocument }) => {

    const [data, setData] = useState(!!document.document ? document.document.sheets[0].cells : {})

    // getDocument
    useEffect( () => {
        getDocument(window.location.pathname.slice(10))
    }, [])

    // Resize row and column
    const handleTextAreaResize = (event, cellID) => {
        console.log('resized: ' + cellID)
        console.log(event.target.style.height)
        console.log(convertAdressToCoorginates(cellID))
    }

    // Handle cell blur
    const handleCellBlur = (event, cellID) => {
        event.target.value = ""
        calculateCellsValue(data)
    }

    // Handle cell changes
    const handleCellChange = (event, cellID) => {

        // If value is empty - delete key
        if (event.target.value === "") {
            delete data[cellID]
        } else {
            
            // If there is no key in data object - create it
            data[cellID] === undefined ? setData ( {...data, [cellID]: {formula: event.target.value} } ): setData( {...data, [cellID] : {formula: event.target.value} } )
        
        }

    }

    // Convert decimal index into string [A-Z] index 
    function convertNumberIndexIngoStringIndex(number) {
    
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
        return result.join("")
    }

    // Calculate cells value
    const calculateCellsValue = (newData) => {
            
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
            
                // Use regular expression to get array of adress of cells
                let cellsAdress = cellsWithFormula[cell].formula.match(REGEX_ADDRESS)
            
                // Get cell value if they are exists
                let isNotNull = false
                if (cellsAdress !== null) {

                    let cellValues = cellsAdress.map( cellAdress => {
                        return newData[cellAdress] === undefined ? "" : newData[cellAdress].value
                    })
               
                    // Check cellsValue for not nul
                    cellValues.map(cellValue => isNotNull = (cellValue === null || isNotNull))
               
                }
            
                // Calculate if all values are calculated
                if (!isNotNull) {
            
                    // Replace cell addres with cell value by formula
                    let formula = newData[cell].formula

                    // If cells adresses are
                    if (cellsAdress !== null) {
                        cellsAdress.map( relatedCell => {
                            formula = formula.replace(relatedCell, newData[relatedCell] === undefined ? 0 : newData[relatedCell].value)
                        })
                    }
            
                    // Calculate by formula
                    try {
                        newData[cell].value = (eval(formula.slice(1))).toFixed(10)
                    }
                    catch {
                        newData[cell].value = "ERROR"
                        continue
                    }
                    
                }
                
            }
            
        // Repeat untill  there is decreasing of number of cells to calculate
        } while (startNumberOfCellsToCalculate != countCellsToCalculate(newData) && countCellsToCalculate(newData) != 0)
        
        // If cells value is null it is mean, that there are cycled refferences
        for (let cell in newData) {
            if (newData[cell].value === null) newData[cell].value = 'CYCLED REFFERENCES'
        }

        // Save data to useState
        setData({...newData})

        // Save data to Redux
        document.document.sheets[0].cells = {...data}
        console.log(document.document.sheets[0])

    }

    // Prepare table data
    let rows = []
    let cells = []
    // let data = !!document.document ? document.document.sheets[0].cells : {}
    let maxRows = !!document.document ? document.document.sheets[0].rowQuantity : 1
    let maxColumns = !!document.document ? document.document.sheets[0].columnQuantity : 1
    let columnDefaultWidths = (!!document.document && !!document.document.sheets[0]) ? document.document.sheets[0].columnDefaultWidth : 60
    let rowDefaultHeight = (!!document.document && !!document.document.sheets[0]) ? document.document.sheets[0].rowDefaultHeight : 30

    // Fill columns head
    for (let columnIndex = 0; columnIndex <= maxColumns; columnIndex++){
        let columnId = columnIndex === 0 ? `begin` : `column-${convertNumberIndexIngoStringIndex(columnIndex)}`
        cells.push(
            <th key={columnId} id={columnId}>
                <Box bgcolor="text.disabled" color="background.paper" width="100%" >
                    {columnIndex === 0 ? ` ` : convertNumberIndexIngoStringIndex(columnIndex) }
                </Box>
            </th>
        )
    }
    rows.push(
        <tr key={0} id={"head"}>
            {cells}
        </tr>
    )

    // Fill rows
    for (var rowIndex = 1; rowIndex <= maxRows; rowIndex++){

        let rowID = `row${rowIndex}`
        cells = []
        
        // Create rows heads
        let rowHeadID = `rowHead${rowIndex}`
        cells.push(<th key={rowHeadID} id={rowHeadID}><Box bgcolor="text.disabled" color="background.paper" width="auto" height="100%">{rowIndex}</Box></th>)
        
        // Create cells
        for (var columnIndex = 1; columnIndex <= maxColumns; columnIndex++){
            let cellID = `${convertNumberIndexIngoStringIndex(columnIndex)}${rowIndex}`
            cells.push(
                <td 
                    key={cellID} 
                    id={cellID}>
                        <textarea 
                            style={{ 
                                width: columnDefaultWidths,
                                height: rowDefaultHeight
                            }}
                            aria-label="empty textarea" 
                            placeholder={ data[cellID] !== undefined ? data[cellID].value : "" }
                            onFocus={ (event) => event.target.value = data[cellID] !== undefined ? data[cellID].formula : "" }
                            onBlur={ (event) => handleCellBlur(event, cellID) }
                            onChange={ (event) => handleCellChange(event, cellID) }
                            onMouseUp={ (event) => handleTextAreaResize(event, cellID) }
                        />
                </td>
            )
        }
        rows.push(<tr key={rowIndex} id={rowID}>{cells}</tr>)
    }

    return (
        !!document.document 
        ?
        <div className="container">
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <Typography variant='h4' >{document.document.name}</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" type="submit" >
                        <EditOutlinedIcon/>
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" variant="contained" type="submit" >Save</Button>
                </Grid>
            </Grid>
            <Button onClick={ (event) => calculateCellsValue(data) }>Calculate</Button>
            {/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" onresize={resizeHandler} width="100%"/> */}
            <div className="row">
                <div>
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        :
        <></>
    )
}

const CDocument = connect(state => ({ document: state.document }), { getDocument } )(Document)

export default CDocument;