import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionChangeCellValue, actionChangeCellsSize } from '../../../actions/document'
import {convertAddressToCoorginates, convertStringIndexIntoNumber} from '../../../maths/maths'

// *********** Maths begins ***********



// *********** Maths ends ***********



const Cell = ({ document, cellID, cells, rowHeight, columnWidth, actionCalculateCellsValue, actionChangeCellValue, actionChangeCellsSize }) => {

    // Focus state to call text area
    const [focusTest, setFocusTest] = useState(false)


    // Get row height from state
    const [height, setHeight] = useState(( !!rowHeight && rowHeight[+convertAddressToCoorginates(cellID).row] !== undefined )
        ? rowHeight[+convertAddressToCoorginates(cellID).row] 
        : document.rowDefaultHeight 
    )

    // Set row height then cells are changed
    useEffect( () => {
        setHeight(
            ( !!rowHeight && rowHeight[+convertAddressToCoorginates(cellID).row] !== undefined )
            ? rowHeight[+convertAddressToCoorginates(cellID).row] 
            : document.rowDefaultHeight )
    }, [rowHeight])



    // Get column width from state
    const [width, setWidth] = useState(( !!columnWidth && columnWidth[convertAddressToCoorginates(cellID).column] !== undefined )
        ? columnWidth[(convertAddressToCoorginates(cellID).column)] 
        :  document.columnDefaultWidth
    )

    // Set column width then cells are changed
    useEffect( () => {
        setWidth(
            ( !!columnWidth && columnWidth[convertAddressToCoorginates(cellID).column] !== undefined )
            ? columnWidth[convertAddressToCoorginates(cellID).column] 
            : document.columnDefaultWidth 
        )
    }, [columnWidth])
    


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
        setFocusTest(false)

    }

    // Handle cell changes
    const handleCellChange = (event, cellID) => {
        actionChangeCellValue(event, cellID);
    }
    
    // Action on mouseUp - save new sizes of rows and columns
    const handleTextAreaResize = (resizedElement, cellID) => {
        actionChangeCellsSize(resizedElement, cellID)
    }

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
                    onFocus={ (event) => event.target.value = cells[cellID] !== undefined ? cells[cellID].formula : "" }
                    onBlur={ (event) => handleCellBlur(event, cellID) }
                    onChange={ (event) => handleCellChange(event, cellID) }
                    onMouseUp={ (event) => handleTextAreaResize(event.target, cellID) }
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

const CCell = connect( state => ({ 
    document: state.document.document.sheets[0], 
    cells: state.document.document.sheets[0].cells,
    rowHeight: state.document.document.sheets[0].rowHeight,
    columnWidth: state.document.document.sheets[0].columnWidth,
}), { 
    actionChangeCellValue, actionChangeCellsSize 
})
(Cell)

export default CCell