import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom'
import io from "socket.io-client"

import { setUsername, createRoom, joinRoom, leaveRoom } from './Actions';
import { Home, Leaderboard, Lobby, Game, NotFound, Winner } from './Pages'
import pokeball from './Components/images/pokeball.svg'
import title from './Components/images/Who.png'

import './App.css'
import MusicPlayer from './Components/MusicPlayer/index.js'

const serverEndpoint = "http://127.0.0.1:5001"
const socket = io(serverEndpoint)

export const SocketContext = createContext(socket)

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.isConnected)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // Get local storage and store state
    // const localStorageData = JSON.parse(window.localStorage.getItem('data'))

    // if(localStorageData){
    //   // Use local storage as source of truth
    //   // Maybe replace with backend database in the future
    //   // dispatch(loadData(localStorageData))
    //   setLocalStorage(localStorageData)
    // }

    // console.log('From local storage:', localStorageData)
    // console.log('Current state:', {username, icon, room, isHost});

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('admin-message', (msg) => {
      console.log(msg)
    })

    socket.on('created-room', ({ msg, code }) => {
      // console.log("CREATED ROOM EVENT", msg)
      dispatch(createRoom(code))
    })
    
    socket.on('joined-room', ({ msg, code, user, others }) => {
      if(others.length < 1)
        console.log(user, "CREATED ROOM", code);
      else
        console.log(user, "JOINED", others.join(','), "IN ROOM", code)
      
      dispatch(joinRoom(code, user, others))
      navigate(`/rooms/${code}`)
    })

    return () => {
      console.log('APP CLEANUP');
      socket.off('connect')
      socket.off('disconnect')
      socket.off('admin-message')
      socket.off('created-room')
      socket.off('joined-room')
    }
  }, [])


  return (
    <SocketContext.Provider value={socket}>
      <div className='App'>
        <button onClick={MusicPlayer}>Music</button>

        <img className="title" src={title} alt="whos that pokemon title"></img>
        <div className="circlesContainer">
          {
            Array(10).fill().map((i, index) => (<img key={index} className="circles" src={pokeball} alt="pokeball"></img>))
          }
        </div>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/rooms/:code" element={<Lobby/>}/>
          <Route path="/game" element={<Game/>}/>
          <Route path="/Winner" element={<Winner/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </SocketContext.Provider>
  )
}
