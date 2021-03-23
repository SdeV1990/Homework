import PropTypes from 'prop-types';

import {createStore} from 'redux';
import {Provider, connect}   from 'react-redux';

let store = createStore((state={count: 0, hours: 0, minutes: 0, seconds: 0, isRun: false}, {type, count, isRun, hours, minutes, seconds}) => {
    if (type === 'DECREASE') {

        // Join zero if it is needed
        const joinZero = (number) => {
            return number < 10 ? '0' + number.toString() : number
        }

        let newCount = state.count - 1

        // Convert count (seconds) into time (hh:mm:ss)
        let newHours = joinZero(Math.floor(newCount/3600))
        let newMinutes = joinZero(Math.floor((newCount-newHours*3600)/60))
        let newSeconds = joinZero(Math.round(newCount-newMinutes*60-newHours*3600))

        return {...state, count: newCount, hours: newHours, minutes: newMinutes, seconds: newSeconds}
    }
    if (type === 'STOP') {
        return {...state, isRun: false}
    }
    if (type === 'START') {
        return {...state, isRun: true}
    }
    if (type === 'SET_COUNT') {

        // Join zero if it is needed
        const joinZero = (number) => {
            return number < 10 ? '0' + number.toString() : number
        }

        // Convert count (seconds) into time (hh:mm:ss)
        let newHours = joinZero(Math.floor(count/3600))
        let newMinutes = joinZero(Math.floor((count-newHours*3600)/60))
        let newSeconds = joinZero(Math.round(count-newMinutes*60-newHours*3600))
        
        return {...state, count: count, hours: newHours, minutes: newMinutes, seconds: newSeconds}
    }
    if (type === 'SET_HOURS') {

        // Calculate new count
        let newCount = +hours*3600 + +state.minutes*60 + +state.seconds

        return {...state, count: newCount, hours: hours}
    }
    if (type === 'SET_MINUTES') {

        // Calculate new count
        let newCount = +state.hours*3600 + +minutes*60 + +state.seconds

        return {...state, count: newCount, minutes: minutes}
    }
    if (type === 'SET_SECONDS') {

        // Calculate new count
        let newCount = +state.hours*3600 + +state.minutes*60 + +seconds

        return {...state, count: newCount, seconds: seconds}
    }

    return state;
})

// Actions
const actionDecrease = () => ({type: 'DECREASE'})
const actionStop = () => ({type: 'STOP'})
const actionStart = () => ({type: 'START'})
const actionSetCount = (newCount) => ({type: 'SET_COUNT', count: newCount})
const actionSetHours = (newHours) => ({type: 'SET_HOURS', hours: newHours})
const actionSetMinutes= (newMinutes) => ({type: 'SET_MINUTES', minutes: newMinutes})
const actionSetSeconds = (newSeconds) => ({type: 'SET_SECONDS', seconds: newSeconds})


// store.subscribe(() => console.log(store.getState()));

// store.dispatch(actionSetCount(3661))

// Move Timer
setInterval(() => {

    // If timer is running and count is more then zero - decrease timer
    if (store.getState().isRun && +store.getState().count > 1) {
        store.dispatch(actionDecrease())
    }
    // If timer is over
    else if (store.getState().isRun && store.getState().count === 1) {
        store.dispatch(actionDecrease())
        store.dispatch(actionStop())
    }
    // If some hitraya jopa set seconds from 0 to 1
    else if (store.getState().isRun && store.getState().count < 1) {
        store.dispatch(actionSetCount(0))
        store.dispatch(actionStop())
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
    actionSetCount: PropTypes.func
}

// Connected inputs
const CHoursInput = connect((state) => ({value: state.hours, isRun: state.isRun}), {onChange: (e) => actionSetHours(e.target.value)})(TimerInput)
const CMinutesInput = connect((state) => ({value: state.minutes, isRun: state.isRun}), {onChange: (e) => actionSetMinutes(e.target.value)})(TimerInput)
const CSecondsInput = connect((state) => ({value: state.seconds, isRun: state.isRun}), {onChange: (e) => actionSetSeconds(e.target.value)})(TimerInput)

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

const Timer = ({count, isRun, actionStop, actionStart}) => {
    return (
        <>
            <InputsContainer count={count} isRun={isRun}/>
            <br/>
            <button disabled={count <= 0 ? true : false} onClick={isRun ? actionStop: actionStart}>{isRun ? 'Stop' : 'Start'}</button>
        </>
    )
}

// Validation
Timer.propTypes = {
    count: PropTypes.number.isRequired,
    isRun: PropTypes.bool.isRequired,
    actionStop: PropTypes.func.isRequired,
    actionStart: PropTypes.func.isRequired,
}

// Connect Timmer to Redux
const CTimer = connect((state) => ({count: state.count, isRun: state.isRun}), {actionStop, actionStart})(Timer)

// Result
const TimerContainer = () => 
    <Provider store={store}>
        <h1>Task "TimerControl"</h1>
        <CTimer/>
    </Provider>

export default TimerContainer