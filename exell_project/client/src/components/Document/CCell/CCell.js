import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionChangeCellValue, actionChangeCellsSize, actionCalculateCellsValue } from '../../../actions/document'
import { convertAddressToCoorginates } from '../../../maths/maths'

const Cell = ({ rowDefaultHeight, columnDefaultWidth, cellID, cells, cellsForRender, rowHeight, columnWidth, actionCalculateCellsValue, actionChangeCellValue, actionChangeCellsSize }) => {

    // Is selected state to call text area
    const [isSelected, setIsSelected] = useState(false)

    console.log('Cell action.')

    // Get row height from state
    const [height, setHeight] = useState(( !!rowHeight && rowHeight[+convertAddressToCoorginates(cellID).row] !== undefined )
        ? rowHeight[+convertAddressToCoorginates(cellID).row] 
        : rowDefaultHeight 
    )

    // Set row height then cells are changed
    useEffect( () => {
        // console.log('Use effect cell height - ' + cellID)
        setHeight(
            ( !!rowHeight && rowHeight[+convertAddressToCoorginates(cellID).row] !== undefined )
            ? rowHeight[+convertAddressToCoorginates(cellID).row] 
            : rowDefaultHeight )
    }, [rowHeight[+convertAddressToCoorginates(cellID).row]])


    // Get column width from state
    const [width, setWidth] = useState(( !!columnWidth && columnWidth[convertAddressToCoorginates(cellID).column] !== undefined )
        ? columnWidth[(convertAddressToCoorginates(cellID).column)] 
        : columnDefaultWidth
    )

    // Set column width then cells are changed
    useEffect( () => {
        // console.log('Use effect cell width - ' + cellID)
        setWidth(
            ( !!columnWidth && columnWidth[convertAddressToCoorginates(cellID).column] !== undefined )
            ? columnWidth[convertAddressToCoorginates(cellID).column] 
            : columnDefaultWidth
        )
    }, [columnWidth[convertAddressToCoorginates(cellID).column]])
    
    // Get value from state
    const [value, setValue] = useState( !!cellsForRender && !!cellsForRender[cellID] ? cellsForRender[cellID] : null )
    
    // Set cell value then cells are changed
    useEffect( () => {
        // console.log('Render cell - ' + cellID)
        setValue(cellsForRender !== undefined || !!cellsForRender[cellID] !== null ? cellsForRender[cellID] : null)
    }, [cellsForRender[cellID]])


    // Action on blur - calculate cells value by formulas
    const handleCellBlur = (event, cellID) => {

        // Check changes
        // console.log('On blure')
        // console.log(document)
        // console.log(cellID)

        // Is curent formula is empty
        const isCurrentValueNull = (!!cells[cellID] && !!cells[cellID].formula) === false
        
        // Is text area value is empty
        const isTextAreaValueEmpty = event.target.value === ""
        
        // Is curent formula equal to text area value
        const isCurrentValueEqualToTextAreaValue = !!cells[cellID] && !!cells[cellID].formula ? cells[cellID].formula == event.target.value : false

        // If current value is null and text area value is empty AND curent value not equal to text area value
        if ( !(isCurrentValueNull && isTextAreaValueEmpty) && !isCurrentValueEqualToTextAreaValue ) {

            // console.log('Calculation and saving entered value!')

            //Save value
            actionChangeCellValue(event, cellID);

            // Calculate cells value
            actionCalculateCellsValue()

        }

        // Hide text area
        setIsSelected(false)

    }
    
    // Action on mouseUp - save new sizes of rows and columns
    const handleTextAreaResize = (resizedElement, cellID) => {

        // Check if element has new sizes
        if ( width !== +(resizedElement.style.width).slice(0, -2) || height !== +(resizedElement.style.height).slice(0, -2) ) {
            actionChangeCellsSize(resizedElement, cellID)            
        }

    }

    return (
        <>
            {isSelected ?
                <textarea
                    autoFocus
                    key={cellID+"test"}
                    id={cellID+"test"}
                    style={{ 
                        top: 0,
                        left: 0,
                        position: 'relative',
                        width: +width,
                        height: +height,
                        display: 'block',
                    }}
                    aria-label="empty textarea"
                    onFocus={ (event) => event.target.value = cells[cellID] !== undefined ? cells[cellID].formula : "" }
                    onBlur={ (event) => handleCellBlur(event, cellID) }
                    onMouseUp={ (event) => handleTextAreaResize(event.target, cellID) }
                />
                : 
                <div
                    style={{
                        height: +height,
                        width: +width,
                        overflow: 'hidden',
                    }}
                    onClick={ () => setIsSelected(true) }
                >
                    {value}
                </div>
            }
        </>
    )
}

const CCell = connect( state => ({ 
    rowDefaultHeight: state.document.document.sheets[0].rowDefaultHeight, 
    columnDefaultWidth: state.document.document.sheets[0].columnDefaultWidth, 
    cells: state.document.document.sheets[0].cells,
    cellsForRender: state.document.document.sheets[0].cellsForRender,
    rowHeight: state.document.document.sheets[0].rowHeight,
    columnWidth: state.document.document.sheets[0].columnWidth,
}), { 
    actionChangeCellValue, 
    actionChangeCellsSize,
    actionCalculateCellsValue
})
(Cell)

export default CCell