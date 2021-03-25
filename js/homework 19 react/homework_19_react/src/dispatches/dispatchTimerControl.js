import PropTypes from 'prop-types' // Validation
import myCustomFunctions from '../customFunctions'

const dispatchTimerControl = (state={count: 0, hours: 0, minutes: 0, seconds: 0, isRun: false}, {type, count, hours, minutes, seconds, isRun}) => {
    if (type === 'DECREASE') {

        // Convert count (seconds) into time
        let newCount = state.count - 1
        let {hours, minutes, seconds} = myCustomFunctions.convertSecondsIntoTime(newCount)

        return {...state, count: newCount, hours, minutes, seconds}
    }
    if (type === 'STOP') {
        return {...state, isRun: false}
    }
    if (type === 'START') {
        return {...state, isRun: true}
    }
    if (type === 'SET_COUNT') {

        // Convert count (seconds) into time
        let {hours, minutes, seconds} = myCustomFunctions.convertSecondsIntoTime(count)
        
        return {...state, count, hours, minutes, seconds}
    }
    if (type === 'SET_HOURS') {

        // Calculate new count wirh new hours
        let newCount = myCustomFunctions.convertTimeIntoSeconds(+hours, +state.minutes, +state.seconds)

        return {...state, count: newCount, hours: hours}
    }
    if (type === 'SET_MINUTES') {

        // Calculate new count wirh new hours minutes
        let newCount = myCustomFunctions.convertTimeIntoSeconds(+state.hours, +minutes, +state.seconds)

        return {...state, count: newCount, minutes: minutes}
    }
    if (type === 'SET_SECONDS') {

        // Calculate new count with new seconds
        let newCount = myCustomFunctions.convertTimeIntoSeconds(+state.hours, +state.minutes, +seconds)

        return {...state, count: newCount, seconds: seconds}
    }

    return state;
}
// Validation
dispatchTimerControl.PropTypes = {
    state: PropTypes.shape({
        count: PropTypes.number,
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        isRun: PropTypes.bool
    }),
    type: PropTypes.string.isRequired,
    count: PropTypes.number,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    isRun: PropTypes.bool
}


export default dispatchTimerControl