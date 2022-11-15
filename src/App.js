import React from 'react'
import {Home, Leaderboard, Lobby, Game} from './Pages'
import {Routes, Route} from 'react-router-dom'
import pokeball from './Components/images/pokeball.svg'
import './App.css'
export default function App() {

  return (
    <div className='App'>
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
