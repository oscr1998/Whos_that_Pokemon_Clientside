import React, {useState} from 'react'
import { Podium } from '../../Components'
import './style.css'
import { useSelector } from 'react-redux';

export default function Winner() {
  const data = useSelector(state => state)
  let array = data.room.users
  const myProfile = {name: data.username,score: data.score}
  console.log(array)
  console.log(myProfile)

  function addProfile(){
    array.push(myProfile)
  }
  addProfile()

  array.sort(function(a, b) {
    return b.score - a.score;
  });

  return (
    <div className='Winner'>
      <div>
        <h1>MACHAMPION:</h1>

        <div>
          <h1>{array[0].name}</h1>
          <h1>{array[1].name}</h1>
          <h1>{array[2].name}</h1>
        </div>

        <div class="lists">
          <h1>Game Leaderboard:</h1>
          <ul class="nes-list is-disc">
            {array.map(el => <li>{el.name}</li>)}
          </ul>
          <ul class="nes-list is-circle">
            {array.map(el => <li>{el.score}</li>)}
          </ul>
        </div>
      </div>

      <button>Back to Lobby?</button>
      <button>Play again?</button>
    </div>
  )
}
