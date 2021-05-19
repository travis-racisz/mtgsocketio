import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
import Card from './Card.js'
import io from "socket.io-client";

const mtg = require("mtgsdk")


export default function Mtgconfig(){ 
    const [chosen, setChosen] = useState(false)
  const [card, setCard] = useState([])
  const socketRef = useRef()
  const [userInput, setUserInput] = useState("")
  const [hasChanged, setHasChanged] = useState({time: Date.now()})

  socketRef.current = io.connect("/")

  useEffect(() => { 
      console.log("useEffect has run")
     searchCard()
   
  }, [userInput])



    const searchCard = () => { 
        if(userInput.length > 3){ 
                  axios.get(`https://api.magicthegathering.io/v1/cards?pageSize=11&name=${userInput}`)
                  .then(res => { 
                      console.log("fired", res.data)
                     const filtered = res.data.cards.filter(card => card.imageUrl ? card : null)
                      setCard([...filtered])}
                      )
                  .catch(err => console.log(err))
          }
    }

    const handleInput = (e) => { 
        const {value} = e.target
        setUserInput(value)
        setHasChanged({time:Date.now()})
            
       
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
