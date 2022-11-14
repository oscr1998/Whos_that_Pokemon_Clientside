import React from 'react'
import { Timer, Choices } from '../../Components'

export default function Game() {
  return (
    <div>
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
