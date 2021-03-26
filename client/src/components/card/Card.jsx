import React from 'react'
import './Card.css'
import translate from '../../i18n/translate'
const Card = (props) => {
    return (
        <div className='card'>
            <h3>{translate(props.text)}</h3>
        </div>
    )
}

export default Card
