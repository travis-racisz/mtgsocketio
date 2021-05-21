import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import {io} from 'socket.io-client'
import './create_room.css'

const socket = io()


export default function CreateRoom(props){ 
    const [code, setCode] = useState("")
    const history = useHistory()
    const create = () => { 
        const id = uuid()
        props.history.push(`/room/${id}`)
    }
    const handleChange = (e) => { 
        setCode(e.target.value)
    }

    const joinRoom = () => { 
        history.push(`/room/${code}`)
    }
    return( 
        <div id="create_room"> 
            <button onClick = {create}>Create Room</button>
            <h2>Or Join a room</h2>
            <input name = "code" placeholder="Room ID" type= "text" value = {code} onChange = {(e) => handleChange(e)}></input>
            <button onClick = {joinRoom}>Join</button>
        </div>
    )
}