import React, { useEffect } from 'react'
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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const Document = ( { document, getDocument }) => {

    // getDocument
    useEffect( () => {
        getDocument(window.location.pathname.slice(10))
    }, [])

    // 
    const resizeHandler = () => {
        console.log('resized')
    }

    // Prepare table data
    let rows = []
    let cells = []
    let maxRows = !!document.document ? document.document.sheets[0].rowQuantity : 1
    let maxColumns = !!document.document ? document.document.sheets[0].columnQuantity : 1
    
    console.log('doc component')
    console.log( !!document.document ? document.document.sheets[0].rowQuantity : 1)

    // Fill columns head
    for (let columnIndex = 0; columnIndex <= maxColumns; columnIndex++){
        let cellID = `cell${0}-${columnIndex}`
        cells.push(
            <th key={cellID} id={cellID}>
                <Box bgcolor="text.disabled" color="background.paper" width="100%" >
                    {columnIndex === 0 ? ` ` : columnIndex }
                </Box>
            </th>
        )
    }
    rows.push(
        <tr key={0} id={"row0"}>
            {cells}
        </tr>
    )

    // Fill rows
    for (var rowIndex = 1; rowIndex <= maxRows; rowIndex++){

        let rowID = `row${rowIndex}`
        let cells = []

        // Fill rows heads
        let cellID = `cell${rowIndex}-${0}`
        cells.push(<th key={cellID} id={cellID}><Box bgcolor="text.disabled" color="background.paper" width="20px" height="100%">{rowIndex}</Box></th>)

        // Fill cells
        for (var columnIndex = 1; columnIndex <= maxColumns; columnIndex++){
            let cellID = `cell${rowIndex}-${columnIndex}`
            cells.push(<td key={cellID} id={cellID}><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>)
        }
        rows.push(<tr key={rowIndex} id={rowID}>{cells}</tr>)
    }
    console.log(rows)

    return (
        !!document.document 
        ?
        <div className="container">
            <div className="row">
            <div className="col s12 board">
                <table id="simple-board">
                <tbody>
                    {rows}
                </tbody>
                </table>
            </div>
            </div>
        </div>

    //     <>
    //         <Grid container direction="row" alignItems="center">
    //             <Grid item>
    //                 <Typography variant='h4' >{document.document.name}</Typography>
    //             </Grid>
    //             <Grid item>
    //                 <Button color="primary" type="submit" >
    //                     <EditOutlinedIcon/>
    //                 </Button>
    //             </Grid>
    //             <Grid item>
    //                 <Button color="primary" variant="contained" type="submit" >Save</Button>
    //             </Grid>
    //         </Grid>
    //         <TextareaAutosize aria-label="empty textarea" placeholder="Empty" onresize={resizeHandler} width="100%"/>
    //         <table border="1px">
    //             <tr>
    //                 <th><Box bgcolor="text.disabled" color="background.paper">1</Box></th>
    //                 <th><Box bgcolor="text.disabled" color="background.paper">2</Box></th>
    //                 <th><Box bgcolor="text.disabled" color="background.paper">3</Box></th>
    //             </tr>
    //             <tr>
    //                 <th>1</th>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" onresize={resizeHandler}/></td>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>
    //             </tr>
    //             <tr>
    //                 <th>2</th>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>
    //             </tr>
    //             <tr>
    //                 <th>3</th>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>
    //                 <td><TextareaAutosize aria-label="empty textarea" placeholder="Empty" /></td>
    //             </tr>
    //         </table>
    //     </>
        
    //         // controls: save, input, adress

    //         // sheets list
            
    //         // sheet
        :
            <></>
    )
}

const CDocument = connect(state => ({ document: state.document }), { getDocument } )(Document)

export default CDocument;