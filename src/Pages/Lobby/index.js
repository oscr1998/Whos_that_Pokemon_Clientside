import React from 'react'
import { PlayerCard } from '../../Components'
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Lobby() {
  const { roomCode } = useParams()

  const users = useSelector(state => state.users)

  return (
    <div>
      <div>
        <div>Room Code: {roomCode} </div>

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
          <input type="number" defaultValue={10}></input>
        </div>
      </div>

      <div>
        <h1>Players:</h1>
        {
          users.map(user => <PlayerCard/>)
        }
      </div>

      <NavLink to="/game">START GAME</NavLink>
    </div>
  )
}
