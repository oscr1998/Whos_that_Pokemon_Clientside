import React from 'react'
import {Home, Leaderboard, Lobby, Game, NotFound} from './Pages'
import {Routes, Route} from 'react-router-dom'
import pokeball from './Components/images/pokeball.svg'
import title from './Components/images/Who.png'
import './App.css'
export default function App() {

  return (
    <div className='App'>

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
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </div>
  )
}
