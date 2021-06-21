import React, { useEffect } from 'react' // useState
import { connect } from 'react-redux'
import { actionCalculateCellsValue, actionSaveDocument, actionGetDocumentAndCalculateCellsValue, actionChangeCellValue, actionChangeCellsSize } from '../../actions/document'
import { convertNumberIndexIngoStringIndex } from '../../maths/maths'

// Material UI
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

// Material UI icons
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

// Components
import Cell from './Cell/Cell'

const Document = ( { document, actionCalculateCellsValue, actionSaveDocument, actionGetDocumentAndCalculateCellsValue,  actionChangeCellValue, actionChangeCellsSize }) => {
    console.log('Document action!')
    // const [maxRows, setMaxRows] = useState(!!document.document ? document.document.sheets[0].rowQuantity : 1)
    // const [rowHeight, setRowHeight] = useState(!!document.document ? document.document.sheets[0].rowHeight : {})
    // console.log(rowHeight)
    // console.log(!!document.document ? document.document.sheets[0].rowHeight : {})

    // Get document and calculate cells value on start
    useEffect( () => {
        actionGetDocumentAndCalculateCellsValue(window.location.pathname.slice(10))
    }, [] )

    // // Set max quantity of rows
    // useEffect( () => {
    //     setMaxRows(!!document.document ? document.document.sheets[0].rowQuantity : 1)
    // }, [!!document.document ? document.document.sheets[0].rowQuantity : 1] )

    // // Set row height
    // useEffect( () => {
    //     setRowHeight(!!document.document ? document.document.sheets[0].rowHeight : {})
    // }, [!!document.document ? document.document.sheets[0].rowHeight : {}] )


    // Prepare table data

    // Irems arrays
    let rows = []
    let cells = []

    // Table size 
    let maxRows = !!document.document ? document.document.sheets[0].rowQuantity : 10
    let maxColumns = !!document.document ? document.document.sheets[0].columnQuantity : 10

    // Row height
    let rowHeight = !!document.document ? document.document.sheets[0].rowHeight : {}
    let rowDefaultHeight = !!document.document ? document.document.sheets[0].rowDefaultHeight : 21

    // Column width
    let columnWidth = !!document.document ? document.document.sheets[0].columnWidth : {}
    let columnDefaultWidth = !!document.document ? document.document.sheets[0].columnDefaultWidth : 21

    // Cells for render
    let cellsForRender = !!document.document ? document.document.sheets[0].cellsForRender : {}

    // Cells object
    let cellsObject = !!document.document ? document.document.sheets[0].cells : {}

    // Fill columns head
    for (let columnIndex = 0; columnIndex <= maxColumns; columnIndex++){
        let columnId = columnIndex === 0 ? 'begin' : `column-${convertNumberIndexIngoStringIndex(columnIndex)}`
        cells.push(
            <th 
                key={columnId} 
                id={columnId}
                style={{
                    backgroundColor: "grey", 
                    color: "white",
                    borderRight: "1px lightGrey dotted",
                }}
            >
                {columnIndex === 0 ? ` ` : convertNumberIndexIngoStringIndex(columnIndex) }
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
                    // border: "solid lightGrey 1px",
                    borderCollapse: "collapse",
                    height: rowHeight[rowIndex] ? rowHeight[rowIndex] : rowDefaultHeight
                }}
            >
                {rowIndex}
            </th>
        )
        
        // Create cells
        for (var columnIndex = 1; columnIndex <= maxColumns; columnIndex++){
            const columnStringIndex = convertNumberIndexIngoStringIndex(columnIndex)
            let cellID = `${columnStringIndex}${rowIndex}`
            cells.push(
                <td 
                    style={{
                        padding: 0,
                        border: "1px lightGrey dotted",
                        backgroundColor: "white",
                    }}
                    key={`${cellID}_cell`} 
                    id={`${cellID}_cell`}
                >
                    <Cell 
                        valueForRender = { cellsForRender[cellID] ? cellsForRender[cellID] : null }
                        cellFormula = { cellsObject[cellID] ? cellsObject[cellID].formula : null }
                        cellHeight = { rowHeight[rowIndex] ? rowHeight[rowIndex] : rowDefaultHeight }
                        cellWidth = { columnWidth[columnStringIndex] ? columnWidth[columnStringIndex] : columnDefaultWidth }
                        // onClick = { (() => console.log('Cell click'))}
                        cellID = { cellID }
                        actionCalculateCellsValue = { actionCalculateCellsValue }
                        actionChangeCellValue = { actionChangeCellValue }
                        actionChangeCellsSize = { actionChangeCellsSize }
                    />
                </td>
            )
        }
        rows.push(
            <tr
                key={rowIndex} 
                id={rowID}
                style={{backgroundColor: 'grey', borderTop: "1px lightGrey dotted", borderBottom: "1px lightGrey dotted"}}
            >
                {cells}
            </tr>
        )
    }

    return (
        !!document.document 
        ?
        <div className="container">
            <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant='h4' >{document.document.name}</Typography>
                </Grid>
                {/* <Grid item>
                    <Button color="primary" type="submit" >
                        <EditOutlinedIcon/>
                    </Button>
                </Grid> */}
                <Grid item>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        type="submit"
                        onClick={ () => actionSaveDocument(document) }
                    > Save </Button>
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

const CDocument = connect(state => ({ 
    document: state.document,
}), { actionCalculateCellsValue, actionSaveDocument, actionGetDocumentAndCalculateCellsValue, actionChangeCellValue, actionChangeCellsSize } )(Document)

export default CDocument;