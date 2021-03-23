import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

// Presentation component
const SecondsTimer = ({seconds}) => <h2>{seconds}</h2>

// Validation
SecondsTimer.propTypes = {
    seconds: PropTypes.number.isRequired
}

// Container component
const TimerContainer = ({seconds, refresh, render}) => {
    
    // JSX variable
    const Render = render

    // States
    const [counter, setCounter] = useState(seconds*1000)
    const [startDate] = useState(new Date().getTime())
    const [endDate] = useState(startDate+seconds*1000)

    // Render in refresh variable value
    useEffect(
        () => {
            let timerId = setInterval( 
                () => setCounter(counter - refresh), 
                refresh
            )
            return () => clearInterval(timerId)
        }
    )

    return <Render seconds={ ( endDate - new Date() ) / 1000 } />
}

// Validation
TimerContainer.propTypes = {
    seconds: PropTypes.number.isRequired,
    refresh: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired
}

const TimerWrapper = () => <>
    <h1>Task "TimerContainer"</h1>
    <TimerContainer seconds={1800} refresh={100} render={SecondsTimer}/>
    <TimerContainer seconds={1800} refresh={300} render={SecondsTimer}/>
    <TimerContainer seconds={1800} refresh={1000} render={SecondsTimer}/>
</>

export default TimerWrapper