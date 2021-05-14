import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Mtgconfig from '../mtgsearch/Mtgconfig.js'
import "../CSS/room.css"



const Video = (props) => {
    const ref = useRef()

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream
        })
    }, [])

    return (
        <video className = {`video${props.video}`} playsInline autoPlay ref={ref}></video> 
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([])
    const socketRef = useRef()
    const userVideo = useRef()
    const peersRef = useRef([])
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/")
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID)
            console.log('joined room')
            socketRef.current.on("all users", users => {
                console.log(users)
                const peers = []
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream)
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer)
                })
                setPeers(peers)
            })

            socketRef.current.on("user joined", payload => {
                console.log("user joined")
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer])
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id)
                item.peer.signal(payload.signal)
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        console.log("createPeer")
        const peer = new Peer({
            initiator: true, 
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        console.log("addPeer")
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal)

        return peer;
    }

    return (
        <div> 
            <h1>Welcome</h1>
            <h2>Copy invite code here: {roomID}</h2>
        <div className = "videos-container">
            
            <video className = "hostvideo" muted ref={userVideo} autoPlay playsInline></video>
            {peers.map((peer, index) => {
                return (
                    <>
                        <Video key={index} video = {index + 1} peer={peer} />
                    </>
                );
            })}
        </div>
            <Mtgconfig />
            </div>
    );
};

export default Room;