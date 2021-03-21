import PropTypes from "prop-types";

import {createStore} from 'redux';
import {Provider, connect}   from 'react-redux';

let store = createStore((state={count: 1800, isRun: true}, {type, count, isRun}) => {
    if (type === "DECREASE") {
        return {...state, count: state.count - 1}
    }
    if (type === "STOP") {
        return {...state, isRun: false}
    }
    if (type === "START") {
        return {...state, isRun: true}
    }
    return state;
})

const actionDecrease = () => ({type: "DECREASE"})
const actionStop = () => ({type: "STOP"})
const actionStart = () => ({type: "START"})

// store.subscribe(() => console.log(store.getState()));

setInterval(() => {
    if (store.getState().isRun && +store.getState().count > 0) {
        store.dispatch(actionDecrease())
    }
}, 1000);

const Timer = ({count, isRun, actionStop, actionStart}) => {

    let hours = Math.floor(count/3600)
    let minutes = Math.floor((count-hours*3600)/60)
    let seconds = Math.round(count-minutes*60-hours*3600)

    const joinZero = (number) => {
        return number < 10 ? "0" + number.toString() : number
    }

    return (
        <>
            <span>{joinZero(hours)+':'+joinZero(minutes)+':'+joinZero(seconds)}</span>
            <br/>
            <button onClick={isRun ? actionStop: actionStart}>{isRun ? "Stop" : "Start"}</button>
        </>
    )
}

Timer.propTypes = {
    count: PropTypes.number.isRequired,
    isRun: PropTypes.bool.isRequired,
    actionStop: PropTypes.func.isRequired,
    actionStart: PropTypes.func.isRequired,
}

const CTimer = connect((state) => ({count: state.count, isRun: state.isRun}), {actionStop, actionStart})(Timer)

const TimerContainer = () => 
    <Provider store={store}>
        <h1>Task "Timer"</h1>
        <CTimer/>
    </Provider>

export default TimerContainer