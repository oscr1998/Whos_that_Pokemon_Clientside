import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loadData, setRoom, leaveRoom, addUser } from '../../Actions';
import { setUsername } from '../../Actions'

import './style.css'
import io from "socket.io-client"

// !IMAGES ###########################################
import icon0 from '../../Components/images/icons/pikachu_normal.png'
import icon1 from '../../Components/images/icons/pikachu_ash.png'
import icon2 from '../../Components/images/icons/pikachu_charizard.png'
import icon3 from '../../Components/images/icons/pikachu_chef.png'
import icon4 from '../../Components/images/icons/pikachu_grad.png'
import icon5 from '../../Components/images/icons/pikachu_gyarados.png'
import icon6 from '../../Components/images/icons/pikachu_chef.png'
import icon7 from '../../Components/images/icons/pikachu_intern.png'
import icon8 from '../../Components/images/icons/pikachu_lugia.png'
import icon9 from '../../Components/images/icons/pikachu_magi.png'
import icon10 from '../../Components/images/icons/pikachu_mush.png'
import icon11 from '../../Components/images/icons/pikachu_artist.png'
import icon12 from '../../Components/images/icons/pikachu_pinkgya.png'
import icon13 from '../../Components/images/icons/pikachu_ray.png'
import icon14 from '../../Components/images/icons/pikachu_sailor.png'
import icon15 from '../../Components/images/icons/pikachu_shinyray.png'
import icon16 from '../../Components/images/icons/pikachu_trainerhat.png'
import icon17 from '../../Components/images/icons/pikachu-Ho-Oh.png'
import icon18 from '../../Components/images/icons/pikachu-raincoat.png'
import icon19 from '../../Components/images/icons/pikachu-summer.png'
import icon20 from '../../Components/images/icons/pikachu-toy.png'
import icon21 from '../../Components/images/icons/pikachu-wizard.png'
import icon22 from '../../Components/images/icons/mimikyu.png'

let playerIcons = [
  icon0,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon10,icon11,icon12,icon13,icon14,icon15,icon16,icon17,icon18,icon19, icon20,icon21,icon22
]
// !#####################################################
const serverEndpoint = "http://127.0.0.1:5001";
const socket = io(serverEndpoint);

const getFormData = form => Object.fromEntries(new FormData(form))
const generateId = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  let result = ''
  for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength))

  return result
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.isConnected)
  const [localStorage, setLocalStorage] = useState(null)
  const [inRoom, setInRoom] = useState(false)

  const username = useSelector(state => state.username)
  const room = useSelector(state => state.room)
  const isHost = useSelector(state => state.isHost)
  const icon = useSelector(state => state.icon)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function createRoom(e) {
    e.preventDefault()
    const data = getFormData(e.target)
    dispatch(setUsername(data.name))

    // generate a room code
    // const code = generateId(5).toUpperCase()

    // Send room code to socket to store it
    // return isUnique
    socket.emit('create-new-room')

    // if isUnique

    // // assign Icon
    // let randomInt = Math.floor(Math.random()*playerIcons.length)
    // dispatch(addUser(data.name, playerIcons[randomInt]))
    // // setInRoom(roomCode)
    // dispatch(setRoom(roomCode, data.name, true))

    // console.log({username, room, isHost});
    
    // // navigate to lobby for the new room
    // navigate(`/rooms/${roomCode}`)
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

    // assign Icon
    let randomInt = Math.floor(Math.random()*playerIcons.length)
    dispatch(addUser(data.name, playerIcons[randomInt]))

    dispatch(setRoom(data.roomCode, data.name, false))

    navigate(`/rooms/${data.roomCode}`)
  }

  function leaveRoomHandler(){
    dispatch(leaveRoom())
    window.location.reload()
  }

  useEffect(() => {
    // Get local storage and store state
    const localStorageData = JSON.parse(window.localStorage.getItem('data'))

    if(localStorageData){
      // Use local storage as source of truth
      // Maybe replace with backend database in the future
      dispatch(loadData(localStorageData))
      setLocalStorage(localStorageData)
    }

    console.log('From local storage:', localStorageData)
    console.log('Current state:', {username, icon, room, isHost});

    socket.on('created-room', ({ msg, code }) => {
      console.log(msg);
    })
    
    socket.on('joined-room', ({ msg, code }) => {
      console.log(msg, code);
      setInRoom(code)
    })

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

      {
        inRoom ?
        
        <div>
          Hello {username}! You're already in room {room.code}.

          <button onClick={() => navigate(`/rooms/${room.code}`)}>Rejoin</button>
          <button onClick={leaveRoomHandler}>Leave</button>
        </div> :
        
        <div className = "formContainer">
          <div className='form1 smallContainer'>
            <form name="createRoom" onSubmit={createRoom}>
              <label>
                Name
                <input type="text" placeholder='Enter a Name' name='name' defaultValue={username} required className="inputField"></input>
              </label>
              <button>Create Room</button>
            </form>
          </div>
          <div className='form2 smallContainer'>
          <form name="joinRoom" onSubmit={joinRoom}>
            <label>
              Room code
              <input type="text" placeholder='Enter room code' name='roomCode' required className="inputField"></input>
            </label>
            <label>
              Name
              <input type="text" placeholder='Enter a name' name='name' defaultValue={username} required></input>
            </label>
            <input type="submit" value="Join"></input>
          </form>
          </div>
        </div>

      }

      <div>
        Rules
      </div>

      <div>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </div>
      
    </div>
  )
}
