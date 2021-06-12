import React, { useEffect } from 'react'
import { getDocument } from '../../actions/document'
import { connect } from 'react-redux'
import { actionCalculateCellsValue } from '../../actions/document'
import { convertNumberIndexIngoStringIndex } from '../../maths/maths'

// Material UI
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

// Material UI icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import CCell from './CCell/CCell'

const Document = ( { document, getDocument, actionCalculateCellsValue }) => {












    // WRITE ACTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Get document and calculate cells value
    useEffect( () => {

        // Warning: An effect function must not return anything besides a function, which is used for clean-up.
        getDocumentAndCalculate()
        async function getDocumentAndCalculate() {

            // Load document from server
            await getDocument(window.location.pathname.slice(10))

            // Calculate cell value after load
            actionCalculateCellsValue()
            
        }

    }, [] )


















    // Prepare table data
    let rows = []
    let cells = []
    let maxRows = !!document.document ? document.document.sheets[0].rowQuantity : 1
    let maxColumns = !!document.document ? document.document.sheets[0].columnQuantity : 1

    // Fill columns head
    for (let columnIndex = 0; columnIndex <= maxColumns; columnIndex++){
        let columnId = columnIndex === 0 ? `begin` : `column-${convertNumberIndexIngoStringIndex(columnIndex)}`
        cells.push(
            <th key={columnId} id={columnId}>
                <div style={{
                    width: "100%", 
                    height: "100%", 
                    backgroundColor: "grey", 
                    color: "white"
                }} >
                    {columnIndex === 0 ? ` ` : convertNumberIndexIngoStringIndex(columnIndex) }
                </div>
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
        cells.push(
            <th 
                key={rowHeadID} 
                id={rowHeadID}
                style={{
                    display: "block",
                    padding: "0 5px",
                    backgroundColor: "grey",
                    color: "white",
                    border: "solid black 1px",
                    borderCollapse: "collapse",
                    height: "100%",
                }}
            >
                {rowIndex}
            </th>
        )
        
        // Create cells
        for (var columnIndex = 1; columnIndex <= maxColumns; columnIndex++){
            let cellID = `${convertNumberIndexIngoStringIndex(columnIndex)}${rowIndex}`
            cells.push(
                <td 
                    style={{
                        padding: 0,
                        border: "1px grey",
                        borderStyle: "dotted",
                        backgroundColor: "white",
                    }}
                    border={'1px dotted black'}
                    key={`${cellID}_cell`} 
                    id={`${cellID}_cell`}>
                        <CCell 
                            onClick={(() => console.log('Cell click'))}
                            cellID={cellID}
                            actionCalculateCellsValue={actionCalculateCellsValue}
                        >
                        </CCell>
                </td>
            )
        }
        rows.push(
            <tr
                key={rowIndex} 
                id={rowID}
            >
                {cells}
            </tr>
        )
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
            <div className="row">
                <div>
                    <table style={{borderCollapse: "collapse", borderWidth: "1px"}}>
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

const CDocument = connect(state => ({ document: state.document }), { getDocument, actionCalculateCellsValue } )(Document)

export default CDocument;