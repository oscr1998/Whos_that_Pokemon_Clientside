import React, { useEffect, useState } from 'react'
import { PlayerCard } from '../../Components'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../../Actions';
import './style.css'

export default function Lobby() {
  const { code } = useParams()
  const [localStorage, setLocalStorage] = useState(null)

  const room = useSelector(state => state.room)
  const isHost = useSelector(state => state.isHost)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Get local storage and store state
    const localStorageData = JSON.parse(window.localStorage.getItem('data'))

    if(localStorageData){
      // Use local storage as source of truth
      // Maybe replace with backend database in the future
      dispatch(loadData(localStorageData))
      setLocalStorage(localStorageData)
    }

    console.log(room);

    // If local storage is different from redux state
  }, [])

  // return (code === room.code || localStorage?.room.code === code) ? (
  // return (
  return (room.code === code) ? (
    <div className='Lobby'>
      <div>
        <div>Room {code} ({room.host} is host) </div>

        <div>
          <label>Choose Pokemon Generation:</label>
          <select>
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
        </div>

        <div>
          <label>Number of rounds?:</label>
          <input type="number" defaultValue={10} min='1' max='10'></input>
        </div>
      </div>

      <div>
        <h1>Players:</h1>
        {
          room.users.map(user => <PlayerCard key={user} name={user}/>)
        }
      </div>

      <NavLink to="/game">START GAME</NavLink>
    </div>
  ) 
  : (
    <div>
      Wrong room! Are you looking for room {room.code}
      <button onClick={() => navigate('/')}>&larr; Go back home</button>
    </div>
  )
}
