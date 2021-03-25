import PropTypes from 'prop-types'; // Validation

import {createStore} from 'redux';
import {Provider, connect}   from 'react-redux';

import dispatchTimer from '../dispatches/dispatchTimer'

import actionTimerDecrease from '../actions/actionTimerDecrease'
import actionTimerStop from '../actions/actionTimerStop'
import actionTimerStart from '../actions/actionTimerStart'

import myCustomFunctions from '../customFunctions'

let store = createStore(dispatchTimer)

// store.subscribe(() => console.log(store.getState()));

// Move Timer
setInterval(() => {

    // If timer is running and count is more then zero - decrease timer
    if (store.getState().isRun && +store.getState().count > 0) {
        store.dispatch(actionTimerDecrease())
    }

}, 1000);

const Timer = ({count, isRun, actionTimerStop, actionTimerStart}) => {

    // Convert count (seconds) into time
    let {hours, minutes, seconds} = myCustomFunctions.convertSecondsIntoTime(count)

    return (
        <>
            <span>{hours + ':' + minutes + ':' + seconds}</span>
            <br/>
            <button onClick={isRun ? actionTimerStop: actionTimerStart}>{isRun ? 'Stop' : 'Start'}</button>
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

// Connect timer to Redux
const CTimer = connect((state) => ({count: state.count, isRun: state.isRun}), {actionTimerStop, actionTimerStart})(Timer)

// Result
const TimerContainer = () => 
    <Provider store={store}>
        <h1>Task "Timer"</h1>
        <CTimer/>
    </Provider>

export default TimerContainer