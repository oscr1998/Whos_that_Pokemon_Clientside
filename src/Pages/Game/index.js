import React, { useState, useEffect } from "react";
import axios from "axios";
import { Timer, Choices } from '../../Components'
import './style.css'

export default function Game() {
  const [sprite, setSprite] = useState([]);

  async function axiosPokeApiTest(i) {
    const fetchApi = `https://kakunamatata.herokuapp.com/pokemon/${i}`
    try {
        const apiData = await axios.get(fetchApi);
        const data = await apiData.data.image
        console.log("DATA DATA DATA", data);
        setSprite(data)
    } catch(err){ console.error(err)
      console.log("FAIL FAIL");
    }
  }

  useEffect(() => {
    axiosPokeApiTest(90)
}, [])


// Round limit

// start round

// present 4 choices, 1 correct, 3 wrong

// choose answer and on selection it gives score, the quicker you answer the higher the score?

// gives points to user

// Timer for each round

// End of each round it reveals pokemon and correct answer

// rounds repeat until round limit

// goes to end screen


  return (
    <div className='Game'>
      <img className="filteredImg" src={sprite}></img>
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
