import PropTypes from 'prop-types' // Validation

const actionTimerSetMinutes= (newMinutes) => ({type: 'SET_MINUTES', minutes: newMinutes})
 // Validation
 actionTimerSetMinutes.PropTypes = {
    newMinutes: PropTypes.number.isRequired
}

export default actionTimerSetMinutes