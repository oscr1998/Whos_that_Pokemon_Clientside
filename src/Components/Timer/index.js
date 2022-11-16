import React, { useState, useEffect } from 'react'
import './style.css'

export default function Timer() {
  const [time, setTime] = useState();
  const [timeGuess, setTimeGuess] = useState();

var timeleft = 8;
  useEffect(()=>{
    setTime(8)
    let quizTimer = setInterval(function(){
      setTime(prev => prev-1);
      timeleft -= 1
      console.log(timeleft)
      if(timeleft=== 0){
        setTime(8)
        timeleft = 8
        console.log("please")
      }
    }, 1000)
    return () => clearInterval(quizTimer)
  },[])

var timeToGuess = 5
  useEffect(()=>{
    setTimeGuess(5)
    let guessTimer = setInterval(function(){
      timeToGuess -= 1
      setTimeGuess(prev => prev-1)
      if(timeToGuess===-3){
        setTimeGuess(5)
        timeToGuess = 5
      }
    }, 1000)
    return () => clearInterval(guessTimer)
  },[])

  return (
    <>
      <div className="round-time-bar">
        <div className='timerCounter'>
          <h2>Time left of round:{time}</h2>
          <h2>Time left to guess:{timeGuess}</h2>
        </div>
        <progress id="countdown" className="nes-progress is-primary" value={time} max="8"></progress>
      </div>

    </>
  )
}
