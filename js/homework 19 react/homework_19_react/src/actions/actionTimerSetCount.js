import PropTypes from 'prop-types' // Validation

const actionTimerSetCount = (newCount) => ({type: 'SET_COUNT', count: newCount})
 // Validation
 actionTimerSetCount.PropTypes = {
     newCount: PropTypes.number.isRequired
 }

export default actionTimerSetCount