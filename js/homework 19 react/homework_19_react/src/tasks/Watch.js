import PropTypes from 'prop-types' // Validation

import {useState ,useEffect} from 'react'

import myCustomFunctions from '../customFunctions'

const Image = ({source, rotation=0}) => {
    return <img src={source} style={{transform: `rotate(${rotation}deg)`}} alt='Watch'/>
}
// Validation
Image.propTypes = {
    source: PropTypes.string.isRequired,
    rotation: PropTypes.number
}

const Watch = ({hours=0, minutes=0, seconds=0}) => {

    // Convert time into degrees
    let {hoursDegrees, minutesDegrees, secondsDegrees} = myCustomFunctions.convertTimeIntoRotationDegrees({hours, minutes, seconds})

    return (
        <>
            <Image source={'/img/ClockFace.png'} />
            <Image source={'/img/ClockFace_H.png'} rotation={hoursDegrees}/>
            <Image source={'/img/ClockFace_M.png'} rotation={minutesDegrees}/>
            <Image source={'/img/ClockFace_S.png'} rotation={secondsDegrees}/>
        </>
    )
}
// Validation
Watch.propTypes = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
}

const WatchWrapper = () => {

    const [nowTime, setNowTime] = useState(new Date())

    useEffect(
        () => {
            let timerId = setInterval( 
                () => {
                    setNowTime(new Date())
                }, 
                1000
            )
            return () => clearInterval(timerId)
        }
    )

    return (
        <div className='watch_wrapper'>
            <Watch 
                hours={nowTime.getHours()}
                minutes={nowTime.getMinutes()}
                seconds={nowTime.getSeconds()}
            />
        </div>
    ) 

}

export default WatchWrapper