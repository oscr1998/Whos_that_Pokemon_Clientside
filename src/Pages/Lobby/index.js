import React, { useEffect, useState, useContext } from 'react'
import { PlayerCard } from '../../Components'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, leaveRoom, setGen } from '../../Actions';
import './style.css'

import { SocketContext } from '../../App';
import { Socket } from 'socket.io-client';

export default function Lobby() {
  const { code } = useParams()
  const [localStorage, setLocalStorage] = useState(null)

  const user = useSelector(state => state)
  const room = useSelector(state => state.room)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const socket = useContext(SocketContext)
  
  // UNCOMMENT THIS LATER
  // useEffect(() => {
  //   // Get local storage and store state
  //   const localStorageData = JSON.parse(window.localStorage.getItem('state'))

  //   if(localStorageData){
  //     // Use local storage as source of truth
  //     // Maybe replace with backend database in the future
  //     dispatch(loadData(localStorageData))
  //     //setLocalStorage(localStorageData) 
  //   }
  // }, [])

  // copy to clipboard
  function copyToClipBoard() {
     // Copy the text inside the text field
    navigator.clipboard.writeText(code);
    // Alert the copied text
    alert("Copied the text: " + code);
  }

  function startGameHandler(){
    console.log("startgame function", code)
    socket.emit('start-game', code)
    // navigate("/game")
  }

  function leaveRoomHandler(){
    socket.emit('leave-current-room', code)
    dispatch(leaveRoom())
    navigate('/')
  }

  function selectGeneration(e){
    dispatch(setGen(e.target.value))
    socket.emit('set-generation', { gen: e.target.value, room: code})
  }

  return (room.code === code) ? (
  // return (
    <div className='Lobby '>
        <div className="lobbySettings nes-container is-centered">
          <div>Room {code} <br></br>({room.host} is host) <hr></hr></div>
            <button onClick={copyToClipBoard}>Copy Room Code</button>
          <div className="nes-select">
            <label>Choose Pokemon Generation:</label>
          <select id="default_select" disabled={!user.isHost} onChange={selectGeneration}>
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
          <hr></hr>
        </div>

        <div >
          <label>Number of rounds?:</label>
          <input type="number" defaultValue={10} min='1' max='10' disabled={!user.isHost}></input>
        </div>
        { user.isHost ?
          <input type="button" value="START GAME" className="nes-btn is-error" onClick={startGameHandler}></input>
          :
          <p>Waiting for host to start game</p>
        }
        <button className='nes-btn' onClick={leaveRoomHandler}>Leave</button>
        
      </div>
      {/* <NavLink to="/game" className="nes-btn is-error">START GAME</NavLink>  */}
      <div className="lobbyPlayers nes-container is-centered">
        <h1>Players ({room.users.length})</h1>

        <div className='iconGrid'>
          { room.users.map(user => <PlayerCard className="oneIcon" key={user.name} name={user.name} icon={user.icon}/>) }
        </div>
        
      </div>
      
      
    </div>
  ) 
  : (
    <div>
      <p>You're in the wrong place! {room.code && <> Are you looking for room {room.code}? </>}</p>
      
      {room.code && <button onClick={() => navigate(`/rooms/${room.code}`)}>Rejoin</button>}
      <button onClick={() => navigate('/')}>&larr; Go back home</button>
    </div>
  )
}
