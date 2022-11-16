import React, { useEffect } from 'react'
import './style.css'

export default function Timer() {
//   function makeAlert(){ 
//     let valueOfBar = document.getElementById("countdown")
//     valueOfBar.value-1
// };

// setInterval(makeAlert, 1000);
  useEffect(()=>{
    var timeleft = 5;
    let quizTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(quizTimer);
      }
      let counter = document.getElementById("countdown")
      counter.value = counter.value-1;
      timeleft -= 1;
    }, 1000)
  },[])

  return (
    <>
      <div className="round-time-bar">
        <progress id="countdown" className="nes-progress is-primary" value="5" max="5"></progress>
      </div>

    </>
  )
}
