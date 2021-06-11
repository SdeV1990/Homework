import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionChangeCellValue } from '../../../actions/document'

// *********** Maths begins ***********

// Converting address to coordinates - column and row indexes
function convertAddressToCoorginates(string) {
    
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
function convertStringIndexIntoNumber(string) {
  
    let result = 0
    
    // Quantity of iteraiton is the length of string
    for (let charIndex = string.length; charIndex > 0; charIndex-- ) {
        result += Math.pow(26, string.length-charIndex)*(string[charIndex-1].charCodeAt()-64)
    }

    return result
  }

// *********** Maths ends ***********



const Cell = ({ document, cellID, cells, actionCalculateCellsValue, actionChangeCellValue }) => {

    const [focusTest, setFocusTest] = useState(false) 

    // Get height from state
    let height = ( !!document.rowHeight && document.rowHeight[+convertAddressToCoorginates(cellID).row] !== undefined )
        ? document.rowHeight[+convertAddressToCoorginates(cellID).row] 
        :  document.rowDefaultHeight

    // Get width from state
    let width = (!!document.columnWidth && document.columnWidth[+convertStringIndexIntoNumber(convertAddressToCoorginates(cellID).column)] !== undefined )
        ? document.columnWidth[+convertStringIndexIntoNumber(convertAddressToCoorginates(cellID).column)] 
        :  document.columnDefaultWidth

    // Get formula from state
    let formula = cells && cells[cellID] !== undefined ? cells[cellID].formula : null
    
    // Get value from state
    const [value, setValue] = useState( !!cells && cells[cellID] !== undefined ? cells[cellID].value : null )
    
    // Set cell value then cells are changed
    useEffect( () => {
        setValue(!!cells && cells[cellID] !== undefined ? cells[cellID].value : null)
    }, [cells])

    // Action on blur - calculate cells value by formulas
    const handleCellBlur = (event, cellID) => {

        // Clear value
        event.target.value = ""

        // Calculate cells value
        actionCalculateCellsValue()

        // Hide text area
        handleHideInput()

    }

    
    
    // Action on mouseUp - save new sizes of rows and columns
    
    // Handle cell changes
    const handleCellChange = (event, cellID) => {
        actionChangeCellValue(event, cellID);
    }

    const handleHideInput = () => {
        setFocusTest(false)
    }
    
    
    console.log('Cell')
    console.log(cellID)
    console.log(focusTest)

        
    return (
        <>
            {focusTest ?
                <textarea
                    autoFocus
                    key={cellID+"test"}
                    id={cellID+"test"}
                    style={{ 
                        width: +width,
                        height: +height
                    }}
                    aria-label="empty textarea"
                    // placeholder={ value }
                    onFocus={ (event) => event.target.value = cells[cellID] !== undefined ? cells[cellID].formula : "" }
                    onBlur={ (event) => handleCellBlur(event, cellID) }
                    onChange={ (event) => handleCellChange(event, cellID) }
                    // onMouseUp={ (event) => handleTextAreaResize(event) }
                />
                : 
                <div
                    style={{
                        height: +height,
                        width: +width,
                    }}
                    onClick={
                        () => {
                            console.log('click')
                            setFocusTest(true)
                            console.log(focusTest)
                        }
                    }
                >
                    {value}
                </div>
            }
        </>
    )
}

const CCell = connect( state => ({ document: state.document.document.sheets[0], cells: state.document.document.sheets[0].cells  }), { actionChangeCellValue })(Cell)

export default CCell

