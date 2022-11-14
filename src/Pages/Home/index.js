import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import { io } from "socket.io-client"
const serverEndpoint = "http://127.0.0.1:5001";

let socket = io(serverEndpoint);

function handleClick(e) {
  e.preventDefault()
  socket.emit('counter clicked');
}

export default function Home() {
  const [count, setCount] = useState(0); 

  // useEffect(() =>{
  //   socket.on('admin-message', msg => console.log(msg));
  // },[])

  // const joinRoom = (e) => {
  //   e.preventDefault()
  //   socket.emit('request-join-room', {roomId: `test`})}
  useEffect(() => {
    socket.on('counter updated', function(countFromServer) {
      setCount(countFromServer);
    })
    
  }, []);

  return (
    <div>
      <div>
        <form>
          <label>Create User:</label>
          <input type="text"></input>

          <button onClick={handleClick}>Create Room {count}</button>
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
