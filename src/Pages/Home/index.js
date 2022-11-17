import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setName, setIcon, createRoom, joinRoom, leaveRoom, addUser } from '../../Actions';
import { SocketContext } from '../../App';

import './style.css'
// import io from "socket.io-client"

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

const getFormData = form => Object.fromEntries(new FormData(form))
const getRandomNumber = (min, max) => (min + Math.floor(Math.random() * max))
const getRandomIcon = () => playerIcons[getRandomNumber(0, playerIcons.length)]

export default function Home() {
  const socket = useContext(SocketContext)
  const [localStorage, setLocalStorage] = useState(null)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state)
  const room = useSelector(state => state.room)

  useEffect(() => {
    // get user data from local storage
  }, [])

  useEffect(() => {
    setUsername(user.name)
  }, [user])

  function createRoomHandler(e) {
    e.preventDefault()

    dispatch(setName(username))
    dispatch(setIcon(getRandomIcon()))
    
    socket.emit('create-new-room', { name: username })
  }
  
  function joinRoomHandler(e) {
    e.preventDefault()

    const data = getFormData(e.target)

    dispatch(setName(username))
    dispatch(setIcon(getRandomIcon()))

    socket.emit('join-existing-room', { room: data.code, name: username })
  }

  return (
    <div className='Home'>
      <div className = "formContainer nes-container is-centered">
        { room.code ? (
          <div className='smallContainer'>
            Hi {user.name}! You're already in room {room.code}.
            <button onClick={() => navigate(`/rooms/${room.code}`)}>Rejoin</button>
            <button onClick={() => dispatch(leaveRoom())}>Leave</button>
          </div>
          ) : (
          <>
          <div className='form1 smallContainer'>
            <form name="createRoom" onSubmit={createRoomHandler} className="createRoom">
              <label>
                Start a new game
                <input type="text" placeholder='Your name' name='name' value={username} onChange={(e) => setUsername(e.target.value)} className="inputField nes-input" required></input>
              </label>
              <button className="nes-btn is-primary">Create Room</button>
            </form>
            <hr></hr>
          </div>
          <div className='form2 smallContainer'>
            <form name="createRoom" onSubmit={joinRoomHandler}>
              <label>
                Or join an existing game
                <input type="text" placeholder='Your name' name='name' value={username} onChange={(e) => setUsername(e.target.value)} className='nes-input' required></input>
                <input type="text" placeholder='Room code' name='code' className="inputField nes-input" required></input>
              </label>
              <input type="submit" value="Join" className="nes-btn is-success btn2"></input>
            </form>
          </div>
          </>
          )}
        <div className='leaderboard'>
          <hr></hr>
          <NavLink to="/leaderboard" className="nes-btn is-warning">Global Leaderboard</NavLink>
        </div>
        <button className='nes-btn is-disabled' disabled>Settings</button>
      </div>
    </div>
  )
}
