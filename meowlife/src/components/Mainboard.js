import React, { useEffect, useState, useContext } from 'react';
import './Mainboard.css';
import Timer from './Timer';
import styled from '@emotion/styled'
import AppContext from '../Context/Context.js'


const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 80vh;
  margin: 0 0;
  padding-top: 9px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Tile = styled.div`
    width: 12vh;
    height: 12vh;
    box-sizing: border-box;
    border: 1px solid #bfbfbf;
    align-items: center;
    justify-content: center;
`



function Mainboard() {
  // setting an initial pos for the cat using [x, y] coordinates
  const [catPos, setCatPos] = useState([3, 3])
  const [points, setPoints] = useState(200)
  const [thirstLvl, setThirstLvl] = useState(0)
  // controls whether or not the blue sprite will be shown, set to true so on mount of app we see it
  const [thirstActivated, setThirstActivated] = useState(true)
  const [thirstTimer, setThirstTimer] = useState(0)
  const [playTime, setPlayTime] = useState(true)
  const [blinkSequence, setBlinkSequence] = useState([])
  const [catSeq, setCatSeq] = useState([])
  const [atBlueSprite, setAtBlueSprite] = useState(false)
  const [atRedSprite, setAtRedSprite] = useState(false)
  const [roundBegun, setRoundBegun] = useState(false)
  const {timer, setTimer} = useContext(AppContext)
  const [reloadGame, setReload] = useState(false)
   // when round is done display the sequence to show user the correct seq ==> time run out, they lost or they won

  // useEffect that updates thirstLvl 
  useEffect(() => {
    const interval = setInterval(() => {
      if (blinkSequence.length < 5) {
        let sequence = Math.floor(Math.random() * 10)
        setThirstTimer(thirstTimer + 1)
        if(sequence % 2 !== 0){
            // odd means blue sprite is blinking so we push in its coordinates
         blinkSequence.push([0, 6])
        } else {
            // even means red sprite is blinking so we push in its coordinates
         blinkSequence.push([6, 0])
        }
        // calling the function that will handle the sprite blinking on the ui lvl
        handleChange(sequence)
      } else {
        setRoundBegun(true);
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [thirstLvl]);
 

  const handleChange = (sequence) => {
    // odd hides the blue sprite and vice versa for red sprite 
    if (sequence % 2 === 0) {
      setPlayTime(false)
      setTimeout(() => {
        setPlayTime(true)
      }, 1000)
    } else {
      setThirstActivated(false)
      setTimeout(() => {
        setThirstActivated(true)
      }, 1000)
    }
  }
  // event handler for checking which tile/square was clicked
  const handleClick = (i, j) => {
    console.log(`Square (${i}, ${j}) was clicked.`);
  };

  useEffect(() => {
    console.log('fetch call of catPos:', catPos);
  }, [catPos]);

  const handleAtBlueSprite = (catPos) => {
    setCatSeq([...catSeq, catPos])
    console.log('blue captured:', catSeq)
  }

  const handleAtRedSprite = (catPos) => {
    setCatSeq([...catSeq, catPos])
    console.log('red captured:', catSeq)
  }

  // in the event a user clicks a key an event handler handles such action by...
  const handleKeyDown = (event) => {
    if(roundBegun === false && timer === 30) {
      alert("The round has not yet begun, wait until the images stop blinking.")
    }
    if(blinkSequence.length === 5 && timer !== 0){
      // setting the cat position to the prevPos var which is an arr that holds the curr state value of [3,3]
      setCatPos(prevPos => {
        let newPos = [...prevPos];
        // using switch case to determine which key was clicked then mathematical operation is done to determine where on the map sprite should move
        switch (event.key) {
          // in the event of arrowup, the new position of x or i will be tht number - 1 bc as u move up the board, the y decrements in value, the rlshp b/n the num and how up u go is an inverse one
          case 'ArrowUp':
            newPos[0] = Math.max(newPos[0] - 1, 0);
          //   console.log(newPos)
            break;
          // if the user moved right, the x value would increment by 1 because the horizontal axis starts at 0 + goes up to 6
          case 'ArrowRight':
            newPos[1] = Math.min(newPos[1] + 1, 6);
          //   console.log(newPos, newPos[1])
            break;
          // if it's down then the x position would add one 
          case 'ArrowDown':
            newPos[0] = Math.min(newPos[0] + 1, 6);
          //   console.log(newPos)
            break;
          case 'ArrowLeft':
            newPos[1] = Math.max(newPos[1] - 1, 0);
          //   console.log(newPos)
            break;
          default:
            break;
        }
        return newPos;
      });
  } 
  handleCatMvmnt()
};

const verifySuccessOfUser = () => {
  // compare blinkSeq to catSeq
  console.log('out')
  let capturingUserAccuracy = []
  for(let i = 0; i < blinkSequence.length; i++){
    if(blinkSequence[i] !== catSeq[i]){
      setPoints(points => points - 50);
      console.log('inside')
      capturingUserAccuracy.push(false)
    } else {
      setPoints(points => points + 100)
      capturingUserAccuracy.push(true)
    }
  }
  let bool = capturingUserAccuracy.find(element => element === false)
  if(bool){
    console.log('falseyyy')
    alert('You failed to complete the tasks 100% correctly. Try again!')
    console.log('reached')
  } else{
   alert('You succesfully completed the task!')
   setReload(true)  
  }

  console.log(capturingUserAccuracy, points, blinkSequence, catSeq)
}

  function handleCatMvmnt() {  
    if(timer !== 0 || !atRedSprite || !atBlueSprite){
      if(catPos[0] === 0 && catPos[1] === 6){
        setAtBlueSprite(true)
        handleAtBlueSprite(catPos);
      }
      if(catPos[0] === 6 && catPos[1] === 0){
        setAtRedSprite(true)
        handleAtRedSprite(catPos);
      }
    } else {
      setRoundBegun(false)
      alert('Game over!')
      verifySuccessOfUser()
    }
    //     // resetting the round: resetting the catPos, timer, blinkSeq, catSeq

  }

  const resetGame = () => {
    setThirstLvl(0)
    setBlinkSequence([])
    setCatSeq([])
    setRoundBegun(false)
    setAtBlueSprite(false)
    setAtRedSprite(false)
  }

  function createBoard() {
    // board is an arr of rows
    const board = [];
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const squareKey = `${i}-${j}`;
        // bool var checking if i and j are 6 + 0, this is the blue sprite
        const isTopRight = i === 6 && j === 0;
        // bool var checking if i and j are 0 + 6, this is the red sprite in the corner
        const isBottomLeft = i === 0 && j === 6;
        // center sprite is the state var, either the one initially assigned or reassigned after event handler
        const center = i === catPos[1] && j === catPos[0];
        // using modulus to make every other square dark
        const squareClass = `square ${(i + j) % 2 === 0 ? "light" : "dark"}`;
        // giving each tile in the row either a div w a null value or an event handler if it is the blue sprite ONLY
        const waterBowl = isTopRight ? <div className={thirstActivated ? "water-bowl" : ''}  /> : null;
        // similarly, scratchPad would be given an event handler if it was the correct tile (i.e. positioning) otherwise null
        const scratchPad = isBottomLeft ? <div className={playTime ? "scratch-pad" : ''} /> : null;
        // cat can only have center positioning otherwise all the other tiles if they are not the waterbowl or scratchpad are null
        const cat = center ? <div className="cat" onKeyDown={handleKeyDown} /> : null;


        // pushing into the row a div for each tile
        row.push(
          <Tile
            // each tile is given a unique indentifier of it's [x,y] pos
            key={squareKey}
            // either its a dark or a light tile
            className={squareClass}
            // each tile had an event handler that simply console logs which tile was clicked and where
            onClick={() => handleClick(i, j)}
          // either null value or the sprite pos passed in
          >
            {waterBowl}
            {scratchPad}
            {cat}
          </Tile>
        );
      }
      // the board will have a unique key of its i pos and the row arr
      board.push(<div key={i} className="row">{row}</div>);
    }
    return board;
  }

   return (
      <Board onKeyDown={handleKeyDown} tabIndex="0">
        {'Points:'} {points}
        {createBoard()}
        {roundBegun ? <Timer/>: null}
      </Board>
    );
 }


export default Mainboard;