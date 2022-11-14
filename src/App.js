import React from 'react'
import {Home, Leaderboard, Lobby, Game} from './Pages'
import {Routes, Route} from 'react-router-dom'

export default function App() {

  return (
    <div>
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
