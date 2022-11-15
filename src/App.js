import React from 'react'
import {Home, Leaderboard, Lobby, Game} from './Pages'
import {Routes, Route} from 'react-router-dom'
import pokeball from './Components/images/pokeball.svg'
import title from './Components/images/Who.png'
import './App.css'
export default function App() {

  return (
    <div className='App'>
      <img class="title" src={title} alt="whos that pokemon title"></img>
      <div class="circlesContainer">
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
        <img class="circles" src={pokeball} alt="pokeball"></img>
      </div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/:roomCode" element={<Lobby/>}/>
        <Route path="/game" element={<Game/>}/>
        {/* <Route path="*" element={<Error404/>}/> */}
      </Routes>
    </div>
  )
}
