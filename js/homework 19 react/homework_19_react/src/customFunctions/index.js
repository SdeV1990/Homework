import PropTypes from 'prop-types' // Validation


const convertSecondsIntoTime = (count=0) => {

    // Convert count (seconds) into time
    let hours = Math.floor(count/3600)
    let minutes = Math.floor((count-hours*3600)/60)
    let seconds = Math.round(count-minutes*60-hours*3600)

    // Join zero if it is needed
    const joinZero = (number) => {
        return number < 10 ? '0' + number.toString() : number
    }

    hours = joinZero(hours)
    minutes = joinZero(minutes)
    seconds = joinZero(seconds)

    return {hours, minutes, seconds}

}
// Validation
convertSecondsIntoTime.propTypes = {
    count: PropTypes.number.isRequired
}


const convertTimeIntoSeconds = (hours=0, minutes=0, seconds=0) => {

    return +hours*3600 + +minutes*60 + +seconds
    
}
// Validation
convertSecondsIntoTime.propTypes = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
}


const convertTimeIntoRotationDegrees = ({hours, minutes, seconds}) => {

    let hoursDegrees = (hours % 24) / 12 *360
    let minutesDegrees = (minutes % 60) / 60 *360
    let secondsDegrees = (seconds % 60) / 60 *360

    return {hoursDegrees, minutesDegrees, secondsDegrees}
}
// Validation
convertTimeIntoRotationDegrees.propTypes = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
}

export default {convertSecondsIntoTime, convertTimeIntoSeconds, convertTimeIntoRotationDegrees}