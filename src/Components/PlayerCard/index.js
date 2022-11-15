import React, { useState, useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';

import icon from '../images/icons/pikachu_normal.png'
import icon1 from '../images/icons/pikachu_ash.png'
import icon2 from '../images/icons/pikachu_charizard.png'
import icon3 from '../images/icons/pikachu_chef.png'
import icon4 from '../images/icons/pikachu_grad.png'
import icon5 from '../images/icons/pikachu_gyarados.png'
import icon6 from '../images/icons/pikachu_chef.png'
import icon7 from '../images/icons/pikachu_intern.png'
import icon8 from '../images/icons/pikachu_lugia.png'
import icon9 from '../images/icons/pikachu_magi.png'
import icon10 from '../images/icons/pikachu_mush.png'
import icon11 from '../images/icons/pikachu_artist.png'
import icon12 from '../images/icons/pikachu_pinkgya.png'
import icon13 from '../images/icons/pikachu_ray.png'
import icon14 from '../images/icons/pikachu_sailor.png'
import icon15 from '../images/icons/pikachu_shinyray.png'
import icon16 from '../images/icons/pikachu_trainerhat.png'
import icon17 from '../images/icons/pikachu-Ho-Oh.png'
import icon18 from '../images/icons/pikachu-raincoat.png'
import icon19 from '../images/icons/pikachu-summer.png'
import icon20 from '../images/icons/pikachu-toy.png'
import icon21 from '../images/icons/pikachu-wizard.png'
import icon22 from '../images/icons/mimikyu.png'

let playerIcons = [
  icon,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon10,icon11,icon12,icon13,icon14,icon15,icon16,icon17,icon18,icon19, icon20,icon21,icon22
]

export default function PlayerCard({name}) {
  const icon = useSelector(state => state.icon)
  let randomInt = Math.floor(Math.random()*playerIcons.length)
 
  return (
    <div className='PlayerCard'>
        <img src={icon} alt="Player avatar" className="playerIcon"></img>
        <h3>{name}</h3>
    </div>
  )
}
