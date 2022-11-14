import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import io from "socket.io-client"
const serverEndpoint = "http://127.0.0.1:5001";
const socket = io(serverEndpoint);

export default function Home() {
  // const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(socket.isConnected)
  const [inRoom, setInRoom] = useState(null)
  
  function submitForm(e) {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))

    socket.emit('create-new-room', data)

    // form.reset()
  }

  useEffect(() => {

    // setSocket({socket})

    // setIsConnected(socket.connected)

    socket.on('admin-message', (msg) => {
      console.log(msg);
    })

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    };
  }, []);

  return (
    <div>
      <div>
        <form name="createRoom" onSubmit={submitForm}>
          <label>Create User:</label>
          <input type="text"></input>

          <button>Create Room</button>
          <NavLink to="/Lobby">Lobby</NavLink>

        </form>

        <form name="joinRoom" onSubmit={submitForm}>
          <label>
            Room code
            <input type="text" placeholder='Enter room code' name='roomCode' required></input>
          </label>
          <label>
            Message
            <input type="text" placeholder='Enter message' name='message' required></input>
          </label>
          <input type="submit"></input>
        </form>
      </div>

      <div>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </div>
    </div>
  )
}
