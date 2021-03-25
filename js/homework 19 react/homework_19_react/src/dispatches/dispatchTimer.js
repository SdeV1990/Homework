import PropTypes from 'prop-types' // Validation

const dispatchTimer = (state={count: 1800, isRun: true}, {type, count, isRun}) => {
    if (type === 'DECREASE') {
        return {...state, count: state.count - 1}
    }
    if (type === 'STOP') {
        return {...state, isRun: false}
    }
    if (type === 'START') {
        return {...state, isRun: true}
    }
    return state;
}
// Validation
dispatchTimer.PropTypes = {
    state: PropTypes.shape({
        count: PropTypes.number,
        isRun: PropTypes.bool
    }),
    type: PropTypes.string.isRequired,
    count: PropTypes.number,
    isRun: PropTypes.bool
}

export default dispatchTimer