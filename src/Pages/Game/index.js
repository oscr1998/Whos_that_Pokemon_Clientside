import React, { useState, useEffect } from "react";
import axios from "axios";
import { Timer, Choices } from '../../Components'
import './style.css'

export default function Game() {
  const [sprite, setSprite] = useState("");
  const [spriteName, setSpriteName]=useState("");
  const [wrongChoice1, setWrongChoice1]=useState("");
  const [wrongChoice2, setWrongChoice2]=useState("");
  const [wrongChoice3, setWrongChoice3]=useState("");

  async function axiosPokeApiTest(i) {
    const fetchApi = `https://kakunamatata.herokuapp.com/pokemon/${i}`
    try {
        const apiData = await axios.get(fetchApi);
        const dataImage = await apiData.data.image
        const dataName = await apiData.data.name
        setSprite(dataImage)
        setSpriteName(dataName)
    } catch(err){ console.error(err)
      console.log("FAIL FAIL");
    }
  }

// Round limit
let roundCount= 0
let roundLimit = 10
let randomNumber = Math.floor(Math.random()*151)
// start round
async function axiosRandomName(i) {
  const fetchApi = `https://kakunamatata.herokuapp.com/pokemon/gen/${i}`
  try {
      const apiData = await axios.get(fetchApi);
      let {data} = await apiData
      const index = data.indexOf(spriteName)
      data.splice(index, 1)

      setWrongChoice1(data[Math.floor(Math.random()*data.length)])
      data.splice(data.indexOf(wrongChoice1), 1)

      setWrongChoice2(data[Math.floor(Math.random()*data.length)])
      data.splice(data.indexOf(wrongChoice2), 1)

      setWrongChoice3(data[Math.floor(Math.random()*data.length)])
      
      console.log("wrong choices:", wrongChoice1, wrongChoice2, wrongChoice3)
      
  } catch(err){ console.error(err)
    console.log("FAIL FAIL");
  }
}
//generate question
useEffect(() => {
  roundCount++
  console.log("round count:", roundCount)
  axiosPokeApiTest(randomNumber)
}, [])

useEffect(() => {
  axiosRandomName(1)
}, [spriteName])
// present 4 choices, 1 correct, 3 wrong
  let possibleAnswers = [spriteName, wrongChoice1, wrongChoice2, wrongChoice3]

  function randomize(arr) {
    var i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

randomize(possibleAnswers)
// choose answer and on selection it gives score, the quicker you answer the higher the score?
function checkAnswer(e){
  console.log(e.target.value)
  console.log(e.target.id)
  let button1 = document.getElementById("1")
  let button2 = document.getElementById("2")
  let button3 = document.getElementById("3")
  let button4 = document.getElementById("4")
  let pokeImg = document.getElementById("filteredImg")
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  pokeImg.style.filter= "brightness(100%)"
  if(e.target.value == spriteName){
    let button = document.getElementById(e.target.id)
    button.style.backgroundColor = "green"
  } else{
    let button = document.getElementById(e.target.id)
    button.style.backgroundColor = "red"
  }
}
// gives points to user

// Timer for each round

// End of each round it reveals pokemon and correct answer

// rounds repeat until round limit

// goes to end screen
  
  return (
    <div className='Game'>
      <script src="jquery-1.6.1.js"></script>
      <script src="my_jquery.js"></script>
      <img id="filteredImg" src={sprite} alt="Mystery pokemon"></img>
      <Timer/>
      <div className='ImgContainer'>
        <img src='' alt=""></img>
      </div>
      <div className='MultipleChoice'>
        <div id="parent">
          <button id="1" value={possibleAnswers[0]} onClick={checkAnswer}>{possibleAnswers[0]}</button>
          <button id="2" value={possibleAnswers[1]} onClick={checkAnswer}>{possibleAnswers[1]}</button>
          <button id="3" value={possibleAnswers[2]} onClick={checkAnswer}>{possibleAnswers[2]}</button>
          <button id="4" value={possibleAnswers[3]} onClick={checkAnswer}>{possibleAnswers[3]}</button>
        </div>
      </div>
    </div>
  )
}
