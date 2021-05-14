import { card } from 'mtgsdk'
import React, { useState } from 'react'
import "../CSS/card.css"

export default function Card(props){ 
    const [ chosen, setChosen] = useState(false)
    
    return( 
        <div> 
            <button className = "card-title" onClick = {() => setChosen(prev => !prev)}>{props.card.name}</button>
            {chosen ? 
            <div> 
                    <h2>Mana: {props.card.manaCost}</h2>
                    <img src = {props.card.imageUrl} alt = {card.name}></img>
                    <p>{props.card.originalText}</p>
            </div> : null}
        </div>
    )
}