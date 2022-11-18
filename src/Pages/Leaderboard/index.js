import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './style.css'
import Champion from '../../Components/MusicPlayer/champion';

export default function Leaderboard() {
  const room = useSelector(state => state.room)

  const [topScorers, setTopScorers]=useState([]);
  const [topScorersArray, setTopScorersArray]=useState([]);
  const navigate = useNavigate()
  async function fetchTopUsers() {
    const fetchApi = `https://kakunamatata.herokuapp.com/users`
    try {
      const apiData = await axios.get(fetchApi);
      const data = apiData.data.map(user => user.name)
      console.log("in fetch", data)
      setTopScorers(data.sort((a, b) => {
				return b.score - a.score;
    }))
     } catch(err){ console.error(err)
    console.log("FAIL FAIL");
  }
}

  useEffect(() => {
    fetchTopUsers()
    console.log("top", topScorers)
  }, [])



  
  return (
    <div className='Leaderboard nes-container with-title is-centered'>
      <h1>Global Highscores</h1>
      <button onClick={Champion}>Machampion's Anthem</button>
      <br/>
      <br/>
      <div className="leaderboardContainer">
        <div className>
          <h3>Players:</h3>
          <ol className="none">

            {topScorers.slice(0, 5).map(user =><li>{user.name}</li> )}
          </ol>
        </div>

      <div>
        <h3>Scores:</h3>
          <ul className="nes-list is-circle">
          {topScorers.slice(0, 5).map(user =><li>{user.score}</li> )}
          </ul>
        </div>
      </div>
      <br/>
      <br/>
      <button className="nes-btn is-primary" onClick={() => navigate(-1)}>Back</button>
    </div>

  )
}
