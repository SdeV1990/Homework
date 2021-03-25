import React, {useState} from 'react'
import PropTypes from 'prop-types'

const InputsValidation = ({inputValue_1, inputValue_2, minLength=3}) => {

    if (inputValue_1.length < minLength) {
        return <span style={{color: 'red'}}>Password is too short!</span>
    }
    else if (inputValue_1 === inputValue_2) {
        return <span style={{color: 'green'}}>Correct!</span>
    }
    else {
        return <span style={{color: 'red'}}>Not equal values!</span>
    }

}
// Validation
InputsValidation.propTypes = {
    inputValue_1: PropTypes.string.isRequired,
    inputValue_2: PropTypes.string.isRequired,
    minLength: PropTypes.number
}

const PasswordConfirm = ({minLength=3}) => {
    const [inputValue_1, setInputValue_1] = useState('')
    const [inputValue_2, setInputValue_2] = useState('')

    return (<>
        <h1>Task "PasswordConfirm"</h1>
        <div>
            <span>Enter password:</span>
            <br/>
            <input type='password' onInput={(event)=>setInputValue_1(event.target.value)}/>
            <br/>
            <span>Confirm password:</span>
            <br/>
            <input type='password' onInput={(event)=>setInputValue_2(event.target.value)}/>
            <br/>
            <InputsValidation inputValue_1={inputValue_1} inputValue_2={inputValue_2} minLength={minLength}/>
        </div>
    </>)
}
// Validation
PasswordConfirm.propTypes = {
    minLength: PropTypes.number
}

export default PasswordConfirm