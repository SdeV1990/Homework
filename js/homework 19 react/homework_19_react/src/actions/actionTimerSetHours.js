import PropTypes from 'prop-types' // Validation

const actionTimerSetHours = (newHours) => ({type: 'SET_HOURS', hours: newHours})
 // Validation
 actionTimerSetHours.PropTypes = {
    newHours: PropTypes.number.isRequired
}

export default actionTimerSetHours