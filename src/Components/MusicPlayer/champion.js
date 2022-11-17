import ChampionTheme from './Sound/SFX/Pokemon_Machampion_Jingle.mp3';

export default function Champion() {
    const audio = new Audio(ChampionTheme)
    audio.volume = 0.1
    audio.play()
}
