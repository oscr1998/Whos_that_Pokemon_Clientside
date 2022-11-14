import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div>
        <form>
          <label>Create User:</label>
          <input type="text"></input>

          <button>Create Room</button>
          <NavLink to="/Lobby">Lobby</NavLink>

          <label>Join room</label>
          <input type="text"></input>
        </form>
      </div>

      <div>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </div>
    </div>
  )
}
