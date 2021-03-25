import React, {useState} from 'react'
import PropTypes from 'prop-types'

const RangeInput = ({minLength = 3, maxLength = 20}) => {
    const [inputValue, setInputValue] = useState('')

    return (<>
        <h1>Task "RangeInput"</h1>
        <input 
            onChange = {(event) => setInputValue(event.target.value)}
            style={{backgroundColor: minLength > +inputValue.length || maxLength < +inputValue.length ? 'LightCoral' : ''}}
        />
    </>)
}
// Validation
RangeInput.propTypes = {
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
}

export default RangeInput
