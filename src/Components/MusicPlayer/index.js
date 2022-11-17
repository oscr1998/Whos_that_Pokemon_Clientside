import { useState, useEffect} from 'react';
import PokemonTheme from './Sound/Music/Pokemon_Theme.mp3';

export default function MusicPlayer() {
    const audio = new Audio(PokemonTheme)
    audio.volume = 0.1
    audio.play()
}
