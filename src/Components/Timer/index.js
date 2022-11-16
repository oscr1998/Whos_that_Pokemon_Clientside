import React, { useEffect } from 'react'
import './style.css'

export default function Timer() {
//   function makeAlert(){ 
//     let valueOfBar = document.getElementById("countdown")
//     valueOfBar.value-1
// };

// setInterval(makeAlert, 1000);
  useEffect(()=>{
    var timeleft = 10;
    let quizTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(quizTimer);
      }
      let counter = document.getElementById("countdown")
      counter.value = counter.value-1;
      console.log("value:",document.getElementById("countdown").value)
      timeleft -= 1;
      console.log("time:",timeleft)
    }, 1000)
  },[])

  return (
    <>
      <div class="round-time-bar">
        <progress id="countdown" className="nes-progress is-primary" value="10" max="10"></progress>
      </div>

    </>
  )
}
