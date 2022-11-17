import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom'
import io from "socket.io-client"

import { addUser, createRoom, joinRoom, leaveRoom, setGen } from './Actions';
import { Home, Leaderboard, Lobby, Game, NotFound, Winner } from './Pages'
import pokeball from './Components/images/pokeball.svg'
import title from './Components/images/Who.png'

import './App.css'
import MusicPlayer from './Components/MusicPlayer/index.js'
import { Chat } from './Components';

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
    
    socket.on('joined-room', ({ msg, code, user, users }) => {
      if(user.isHost)
        console.log("CREATED ROOM", code, user);
      else
        console.log("JOINED", user, JSON.stringify(users), code)
      
      dispatch(joinRoom(code, user, users))
      navigate(`/rooms/${code}`)

    })

    socket.on('user-joined', ({ user }) =>{
      console.log('User joined', user)
      //dispatch(addUser(user))
    })

    socket.on('started-game', () =>{
      navigate("/game")
      console.log("i work in the app")
    })

    socket.on('updated-score', ({ user, score }) =>{
      console.log(`Update ${user.name}'s score to ${score}`)
    })

    socket.on('new-message', ({ user, msg }) =>{
      console.log(`${user.name}: ${msg}`)
    })

    socket.on('setting-generation', ({gen}) =>{
      console.log("GEN GEN GEN", gen)
      dispatch(setGen(gen))
    })

    return () => {
      console.log('APP CLEANUP');
      socket.off('connect')
      socket.off('disconnect')
      socket.off('admin-message')
      socket.off('created-room')
      socket.off('joined-room')
      socket.off('startGame')
      socket.off('setting-generation')
    }
  }, [])

  function sendChatMessage (e) {
    e.preventDefault()
    
    const data = Object.fromEntries(new FormData(e.target))
    const { room, message } = data

    socket.emit('chat-message', { room, message })
  }


  return (
    <SocketContext.Provider value={socket}>
      <div className='App'>
        <button onClick={MusicPlayer}>Music</button>

        <img className="title" id="pokeTitle" src={title} alt="whos that pokemon title"></img>
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

        <Chat/>
        {/* <div className='chatContainer nes-container with-title is-centered'>
          <h2>Chat</h2>
          <form onSubmit={sendChatMessage}>
            <input type='text' name='room' placeholder='Global channel'></input>
            <input type='text' name='message' placeholder='Message' required></input>
            <input type='submit' value='Send'></input>
          </form>
        </div> */}
      </div>
    </SocketContext.Provider>
  )
}
