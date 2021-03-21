import React, {useState} from 'react'

const SpoilerContent = ({content}) => {
    return (
        <div className = "spoiler_content">
            <i>{content}</i>
        </div>
    )
}

const Spoiler = ({header, open, children}) => {
    const [isOpen, setIsOpen] = useState(open)

    return (<div>
        <div className="spoiler_header" onClick = {() => setIsOpen( () => !isOpen)}>
            {header}
        </div>
        {isOpen ? <SpoilerContent content = {children}/> : null}
    </div>)
}

export default Spoiler