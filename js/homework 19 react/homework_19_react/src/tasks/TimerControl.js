import PropTypes from 'prop-types' // Validation

import {createStore} from 'redux'
import {Provider, connect}   from 'react-redux'

import dispatchTimerControl from '../dispatches/dispatchTimerControl'

import actionTimerDecrease from '../actions/actionTimerDecrease'
import actionTimerStop from '../actions/actionTimerStop'
import actionTimerStart from '../actions/actionTimerStart'
import actionTimerSetCount from '../actions/actionTimerSetCount'
import actionTimerSetHourst from '../actions/actionTimerSetHours'
import actionTimerSetMinutes from '../actions/actionTimerSetMinutes'
import actionTimerSetSeconds from '../actions/actionTimerSetSeconds'

let store = createStore(dispatchTimerControl)

// store.subscribe(() => console.log(store.getState()));

// Move Timer
setInterval(() => {

    // If timer is running and count is more then zero - decrease timer
    if (store.getState().isRun && +store.getState().count > 1) {
        store.dispatch(actionTimerDecrease())
    }
    // If timer is over
    else if (store.getState().isRun && store.getState().count === 1) {
        store.dispatch(actionTimerDecrease())
        store.dispatch(actionTimerStop())
    }
    // If some hitraya jopa set seconds from 0 to 1
    else if (store.getState().isRun && store.getState().count < 1) {
        store.dispatch(actionTimerSetCount(0))
        store.dispatch(actionTimerStop())
    }
}, 1000);

// Timer input
const TimerInput = ({value, isRun, onChange}) => {
    return <input type='number' disabled={isRun} className = 'timer_input' value={value} onChange={onChange}/>
}
// Validation
TimerInput.protoTypes = {
    value: PropTypes.number.isRequired,
    isRun: PropTypes.bool.isRequired,
    actionTimerSetCount: PropTypes.func
}

// Connected inputs
const CHoursInput = connect((state) => ({value: state.hours, isRun: state.isRun}), {onChange: (e) => actionTimerSetHourst(e.target.value)})(TimerInput)
const CMinutesInput = connect((state) => ({value: state.minutes, isRun: state.isRun}), {onChange: (e) => actionTimerSetMinutes(e.target.value)})(TimerInput)
const CSecondsInput = connect((state) => ({value: state.seconds, isRun: state.isRun}), {onChange: (e) => actionTimerSetSeconds(e.target.value)})(TimerInput)

// Timer inputs
const InputsContainer = () => {
    return (
        <span>
            <CHoursInput/>
            :
            <CMinutesInput/>
            :
            <CSecondsInput/>
        </span>
    )
}


// Timer
const Timer = ({count, isRun, actionTimerStop, actionTimerStart}) => {
    return (
        <>
            <InputsContainer count={count} isRun={isRun}/>
            <br/>
            <button disabled={count <= 0 ? true : false} onClick={isRun ? actionTimerStop: actionTimerStart}>{isRun ? 'Stop' : 'Start'}</button>
        </>
    )
}
// Validation
Timer.propTypes = {
    count: PropTypes.number.isRequired,
    isRun: PropTypes.bool.isRequired,
    actionTimerStop: PropTypes.func.isRequired,
    actionTimerStart: PropTypes.func.isRequired,
}

// Connect Timmer to Redux
const CTimer = connect((state) => ({count: state.count, isRun: state.isRun}), {actionTimerStop, actionTimerStart})(Timer)

// Result
const TimerContainer = () => 
    <Provider store={store}>
        <h1>Task "TimerControl"</h1>
        <CTimer/>
    </Provider>

export default TimerContainer