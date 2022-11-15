import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css'

import io from "socket.io-client"
import { setRoom } from '../../Actions';
const serverEndpoint = "http://127.0.0.1:5001";
const socket = io(serverEndpoint);

const getFormData = (form) => Object.fromEntries(new FormData(form))

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Home() {
  // const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(socket.isConnected)
  const [inRoom, setInRoom] = useState(null)
  const navigate = useNavigate()

  const username = useSelector(state => state.username)
  const room = useSelector(state => state.room)
  const isHost = useSelector(state => state.isHost)

  const dispatch = useDispatch()

  function createRoom(e) {
    e.preventDefault()
    const data = getFormData(e.target)

    // generate a room code
    const roomCode = makeid(5).toUpperCase()

    // Send room code to socket to store it
    // return isUnique
    // socket.emit('create-new-room', data)

    // if isUnique
    // setInRoom(roomCode)
    dispatch(setRoom(roomCode, data.name, true))

    console.log({username, room, isHost});
    
    // navigate to lobby for the new room
    navigate(`/${roomCode}`)
  }
  
  function joinRoom(e) {
    e.preventDefault()
    const data = getFormData(e.target)

    // Get the room from server
    console.log("Searching for", data.roomCode);

    // Validate room code
    // socket.emit('join-room', data)

    // Connect to room
    console.log("Connecting to", data.roomCode);
    navigate(`/${data.roomCode}`)
  }

  useEffect(() => {
    console.log({username, room, isHost});
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
    <div className='Home'>

      {room.code && <p>Already in a room. <a href='#'>Leave room {room.code}</a></p>}

      <div>
        <form name="createRoom" onSubmit={createRoom}>
          <label>
            Name
            <input type="text" placeholder='Enter a Name' name='name' required></input>
          </label>
          <button>Create Room</button>
        </form>
        
        <form name="joinRoom" onSubmit={joinRoom}>
          <label>
            Room code
            <input type="text" placeholder='Enter room code' name='roomCode' required></input>
          </label>
          <label>
            Name
            <input type="text" placeholder='Enter a Name' name='Name' required></input>
          </label>
          <input type="submit" value="Join"></input>
        </form>
      </div>

      <div>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </div>
    </div>
  )
}
