import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Leaderboard() {
  const room = useSelector(state => state.room)
  const [topScorers, setTopScorers]=useState([]);
  const [topScorersArray, setTopScorersArray]=useState([]);
  const navigate = useNavigate()
  async function fetchTopUsers() {
    const fetchApi = `https://kakunamatata.herokuapp.com/users`
    try {
      const apiData = await axios.get(fetchApi);
      let {data} = await apiData
      console.log("in fetch", data)
      setTopScorers(data)
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
      <br/>
      <br/>
      <div className="leaderboardContainer">
        <div className>
          <h3>Players:</h3>
          <ol className="none">
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ol>
        </div>

      <div>
        <h3>Scores:</h3>
          <ul className="nes-list is-circle">
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
      </div>
      <br/>
      <br/>
      <button className="nes-btn is-primary" onClick={() => navigate(-1)}>Back to Previous</button>
    </div>

  )
}
