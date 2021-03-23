import React, {useState} from 'react'
import PropTypes from 'prop-types' // Not needed, but just want to practice in validation

const SpoilerContent = ({content}) => {
    return (
        <i>{content}</i>
    )
}

const Spoiler = ({header, open, children}) => {
    const [isOpen, setIsOpen] = useState(open)

    return (
        <>
            <div onClick={()=>setIsOpen(()=>!isOpen)}>{header}</div>
            {isOpen ? <SpoilerContent content={children}/> : ''}
            <hr/>
        </>
    )
}

// Validation
Spoiler.propTypes = {
    header: PropTypes.object.isRequired,
    open: PropTypes.bool,
    children: PropTypes.string.isRequired,
}

const TaskSpoiler = () => 
<>
    <h1>Task "Spoiler"</h1>
    <Spoiler header={<h2>First spoiler head</h2>} open={false}>
        First spoiler content.
    </Spoiler>

    <Spoiler header={<h2>Second spoiler head</h2>} open={true}>
        Second spoiler content.
    </Spoiler>

    <Spoiler header={<h2>+</h2>} open={true}>
        Homework spoiler content.
    </Spoiler>
</>

export default TaskSpoiler