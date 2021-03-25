import PropTypes from 'prop-types' // Validation

const actionTimerSetSeconds = (newSeconds) => ({type: 'SET_SECONDS', seconds: newSeconds})
 // Validation
 actionTimerSetSeconds.PropTypes = {
    newSeconds: PropTypes.number.isRequired
}

export default actionTimerSetSeconds