import React, { useState } from 'react'

const Cell = ({ valueForRender, cellFormula, cellHeight, cellWidth, cellID, actionCalculateCellsValue, actionChangeCellValue, actionChangeCellsSize }) => {

    // Is selected state to call text area
    const [isSelected, setIsSelected] = useState(false)

    // console.log('Cell action.')

    // Action on blur - calculate cells value by formulas
    const handleCellBlur = (event, cellID) => {

        // Check changes
        // console.log('On blure')
        // console.log(document)
        // console.log(cellID)

        // Is curent formula is empty
        const isCurrentValueNull = cellFormula === null
        
        // Is text area value is empty
        const isTextAreaValueEmpty = event.target.value === ""
        
        // Is curent formula equal to text area value
        const isCurrentValueEqualToTextAreaValue = cellFormula !== null ? cellFormula == event.target.value : false

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
        if ( cellWidth !== +(resizedElement.style.width).slice(0, -2) || cellHeight !== +(resizedElement.style.height).slice(0, -2) ) {
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
                        width: +cellWidth,
                        height: +cellHeight,
                        display: 'block',
                    }}
                    aria-label="empty textarea"
                    onFocus={ (event) => event.target.value = cellFormula !== null ? cellFormula : "" }
                    onBlur={ (event) => handleCellBlur(event, cellID) }
                    onMouseUp={ (event) => handleTextAreaResize(event.target, cellID) }
                />
                : 
                <div
                    style={{
                        height: +cellHeight,
                        width: +cellWidth,
                        overflow: 'hidden',
                    }}
                    onClick={ () => setIsSelected(true) }
                >
                    {valueForRender}
                </div>
            }
        </>
    )
}

export default Cell