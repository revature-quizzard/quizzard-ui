import useSound from 'use-sound'

const gameEndFx ='../../public/P3_SFX/GameEnd.mp3'

export const EndGameSound = () => {
    const [play] = useSound(gameEndFx); 
}