import { useState, useEffect} from 'react';
import PokemonTheme from './Sound/Music/Pokemon_Theme.mp3';

export default function MusicPlayer() {
    new Audio(PokemonTheme).play()
}
