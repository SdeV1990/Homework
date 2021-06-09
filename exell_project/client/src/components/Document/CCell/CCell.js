import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Cell = ({state, text, style}) => {

    // console.log('Cell test')
    // console.log(state)

    return (
        <div style={style}>
            {text}
        </div>
    )
}

const CCell = connect( state => ({state: state.document}), null)(Cell)

export default CCell