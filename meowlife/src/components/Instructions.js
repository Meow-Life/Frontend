import { useNavigate } from 'react-router-dom'
import './Instructions.css'

export default function Instructions(){
    const navigate = useNavigate();

    const handleClick = () => { 
        navigate('/game')
    }

    return (
        <div id='instr-div'>
            <div className='instruc-container'>
                <h1>Meow Life</h1>
                <h2>Instructions</h2>
                <p className='p-container'>
                    Meow Life is a game that shows users how taking care of a cat might look. The game will begin by a series of blinking images laid out on corresponding tiles. It is your duty to remember what the cat wanted and in what order. Both sprites will blink a cumulitive amount of 5 times, after that, a timer will begin and you will have 20 seconds to accurately guess the order. Failure to do so will result in 50 lost points. If you succeed, you will have a happy cat and 100 points for every successful round.
                </p>
                <button style={{fontSize: '20px'}} onClick={handleClick}>Begin Game</button>
            </div>
        </div>
    )
}