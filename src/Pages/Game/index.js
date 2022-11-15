import React from 'react'
import { Timer, Choices } from '../../Components'
import './style.css'

export default function Game() {
  return (
    <div className='Game'>
      <Timer/>
      <div className='ImgContainer'>
        <img src=''></img>
      </div>

      <div className='MultipleChoice'>
        <Choices/>
        <Choices/>
        <Choices/>
        <Choices/>
      </div>
    </div>
  )
}
