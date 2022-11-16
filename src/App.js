import React from 'react'
import {Home, Leaderboard, Lobby, Game, NotFound} from './Pages'
import {Routes, Route} from 'react-router-dom'
import pokeball from './Components/images/pokeball.svg'
import title from './Components/images/Who.png'
import './App.css'
import MusicPlayer from './Components/MusicPlayer/index.js'

export default function App() {

  return (
    <div className='App'>
      <button onClick={MusicPlayer}>Music</button>
      <img className="title" src={title} alt="whos that pokemon title"></img>
      <div className="circlesContainer">
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
        <img className="circles" src={pokeball} alt="pokeball"></img>
      </div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/rooms/:roomCode" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </div>
  )
}
