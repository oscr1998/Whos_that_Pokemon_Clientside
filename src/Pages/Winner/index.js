import React from 'react'
import { Podium } from '../../Components'

export default function Winner() {
  return (
    <div>
      <div>
        <h1>MACHAMPION:</h1>

        <div>
          <Podium/>
          <Podium/>
          <Podium/>
        </div>
      </div>

      <button>Back to Lobby?</button>
      <button>Play again?</button>
    </div>
  )
}
