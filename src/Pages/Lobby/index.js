import React, { useEffect, useState, useContext } from 'react'
import { PlayerCard } from '../../Components'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../../Actions';
import './style.css'

import { SocketContext } from '../../App';
import { Socket } from 'socket.io-client';

export default function Lobby() {
  const { code } = useParams()
  const [localStorage, setLocalStorage] = useState(null)

  const room = useSelector(state => state.room)
  const isHost = useSelector(state => state.isHost)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const socket = useContext(SocketContext)

  useEffect(() => {
    // Get local storage and store state
    const localStorageData = JSON.parse(window.localStorage.getItem('data'))

    if(localStorageData){
      // Use local storage as source of truth
      // Maybe replace with backend database in the future
      dispatch(loadData(localStorageData))
      setLocalStorage(localStorageData)
    }

    console.log(room)

    // If local storage is different from redux state
  }, [])

  // copy to clipboard
  function copyToClipBoard() {
     // Copy the text inside the text field
    navigator.clipboard.writeText(window.location.href);
    // Alert the copied text
    alert("Copied the text: " + window.location.href);
  }

  function startGame(){
    socket.emit('startGame')
    // navigate("/game")
    console.log("startgame function")
  }

  return (room.code === code) ? (
  // return (
    <div className='Lobby '>
  {/* // return (code === room.code || localStorage?.room.code === code) ? (
  // return ( */}
        <div className="lobbySettings nes-container is-centered">
          <div>Room {code} <br></br>({room.host} is host) <hr></hr></div>
            <button onClick={copyToClipBoard}>Copy Room Link</button>
          <div className="nes-select">
            <label>Choose Pokemon Generation:</label>
          <select id="default_select" disabled={!isHost}>
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
          <input type="number" defaultValue={10} min='1' max='10' disabled={!isHost}></input>
        </div>
        { isHost ?
          <input type="button" value="START GAME" className="nes-btn is-error" onClick={startGame}></input>
          :
          <p>Waiting for host to start game</p>
        }
        
      </div>
      {/* <NavLink to="/game" className="nes-btn is-error">START GAME</NavLink>  */}
      <div className="lobbyPlayers nes-container is-centered">
        <h1>Players:</h1>
        {
          room.users.map(user => <PlayerCard key={user.name} name={user.name}/>)
        }
        
      </div>
      
      
    </div>
  ) 
  : (
    <div>
      Wrong room! Are you looking for room {room.code}
      <button onClick={() => navigate('/')}>&larr; Go back home</button>
    </div>
  )
}
