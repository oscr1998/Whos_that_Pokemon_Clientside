import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './style.css'

export default function Leaderboard() {
  const room = useSelector(state => state.room)

  useEffect(() => {
    console.log(room);
  }, [])

  return (
    <div className='Leaderboard'>
      <h1>Global Leaderboard</h1>
    </div>
  )
}
