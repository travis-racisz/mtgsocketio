import React, { useEffect, useState } from "react"
import axios from 'axios'
import Card from './Card.js'

const mtg = require("mtgsdk")


export default function Mtgconfig(){ 
    const [chosen, setChosen] = useState(false)
  const [card, setCard] = useState([])
  const [userInput, setUserInput] = useState("")

    const searchCard = () => { 
        axios.get(`https://api.magicthegathering.io/v1/cards?name=${userInput}`)
            .then(res => { 
               const filtered = res.data.cards.filter(card => card.imageUrl ? card : null)
                setCard([...filtered])}
                )
            .catch(err => console.log(err))
    }

    const handleInput = (e) => { 
        const {value} = e.target
        setUserInput(value)
    }

    const clearCards = () => { 
        setCard([])
    }
    return( 
        <div> 
            <h1>search card by name</h1>
            <input onChange = {handleInput} type = "text" value = {userInput} name = "userInput"></input>
            <button type = 'submit' onClick = {searchCard}>Search black lotus</button>
            <button onClick = {clearCards}>Clear</button>
            {card && card.map(card => { 
                return( 
                <>
                    <Card card = {card} />
                </>
                )
            })}

        </div>
    )
}
