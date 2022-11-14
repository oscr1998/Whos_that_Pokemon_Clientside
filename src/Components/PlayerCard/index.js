import React from 'react'
import './style.css'

export default function PlayerCard({name}) {
  return (
    <div className='PlayerCard'>
        <img src="" alt="Player avatar"></img>
        <h3>{name}</h3>
    </div>
  )
}
