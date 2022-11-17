import React, {useEffect, useState} from 'react'
import { Podium } from '../../Components'
import './style.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Winner() {
  const users = useSelector(state => state.room.users)
  // const data = useSelector(state => state)
  // let array = data.room.users
  // const myProfile = {name: data.username,score: data.score}
  // console.log(array)
  // console.log(myProfile)


  useEffect(() => {
    users.sort(function(a, b) {
      return b.score - a.score;
    })
  }, [])

  return (
    <div>
    <div className='Winner'>
      <div className="container1 nes-container with-title is-centered">
        <h1><i className="nes-icon trophy is-large"></i>        MACHAMPIONS       <i className="nes-icon trophy is-large"></i></h1>
        <div className="podium">
          <table id="podium">
            <tr>
              <td>
                <div className="text-center">2nd</div>
                <div id="second"><div className="text-inside">
                    <span className="player">
                      {users[1]?.name}
                    </span>
                    <span className="points">
                    Points: {users[0]?.score}
                    </span>
                  </div>
                  </div>
              </td>
              <td>
                <div className="text-center">1st</div>
                <div id="first">
                <div className="text-inside">
                    <span className="player">
                      {users[0]?.name}
                    </span>
                    <span className="points">
                    Points: {users[0]?.score}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-center">3rd</div>
                <div id="third">
                  <div className="text-inside">
                    <span className="player">
                      {users[2]?.name}
                    </span>
                    <span className="points">
                    Points: {users[2]?.score}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="lists container2 nes-container with-title is-centered">
          <h1>Game Leaderboard:</h1>

          <div className="leaderboardContainer">
            <div className="">
              <h3>Players:</h3>
              <ol className="none">
                {users.map(el => <li key={el.name}>{el.name}</li>)}
              </ol>
            </div>

            <div>
            <h3>Scores:</h3>
              <ul className="nes-list is-circle">
                {users.map(el => <li key={el.name}>{el.score}</li>)}
              </ul>
            </div>
          </div>
          <NavLink to="/leaderboard" className="nes-btn is-warning leaderBtn">Global Leaderboard</NavLink>
        </div>

    </div>

    <br/>
    <br/>

      <div className='btnDiv'>
        <button className='nes-btn  winBtn'>Back to Lobby?</button>
        <button className='nes-btn  winBtn'>Play again?</button>
      </div>
    </div>
  )
}
