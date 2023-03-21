import React, { useEffect, useState } from 'react';
import './Mainboard.css';


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
  const [timer, setTimer] = useState(30)
  const [catSeq, setCatSeq] = useState([])
    
  // timer component 
  // disbaling the cat mvmnt until round is done
  // when round is done display the sequence to show user the correct seq ==> time run out, they lost or they won

  // useEffect that updates thirstLvl 
  useEffect(() => {
    const interval = setInterval(() => {
      if (blinkSequence.length < 5) {
        let sequence = Math.floor(Math.random() * 10)
        // console.log(sequence, 'here')
        // console.log(thirstTimer)
        setThirstTimer(thirstTimer + 1)
        if(sequence % 2 !== 0){
            // odd means blue sprite is blinking so we push in its coordinates
         blinkSequence.push([0, 6])
        } else {
        //  setBlinkSequence(blinkSequence)
            // even means red sprite is blinking so we push in its coordinates
         blinkSequence.push([6, 0])
        }
        // console.log(blinkSequence)
        // calling the function that will handle the sprite blinking on the ui lvl
        handleChange(sequence)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [thirstLvl]);
 
  console.log(blinkSequence)

  const handleChange = (sequence) => {
    // console.log(blinkSequence)
    // odd hides the blue sprite and vice versa for red sprite 
    if (sequence % 2 === 0) {
      setPlayTime(false)
      setTimeout(() => {
        setPlayTime(true)
      }, 1000)
    //   console.log('not thirsty', thirstActivated, 'wants to play', playTime)
    } else {
      setThirstActivated(false)
      setTimeout(() => {
        setThirstActivated(true)
      }, 1000)
    //   console.log('thirsty', thirstActivated)
    }
  }
  // event handler for checking which tile/square was clicked
  const handleClick = (i, j) => {
    console.log(`Square (${i}, ${j}) was clicked.`);
  };

  
//   console.log('thirst:', thirstLvl)
  // in the event a user clicks a key an event handler handles such action by...
  const handleKeyDown = (event) => {
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
       console.log('catPos:', catPos)
      if(catPos[0] === 0 && catPos[1] === 6){
        setCatSeq([...catSeq, catPos])
        console.log('Trying to add to array', catSeq)
        console.log('blue')
      }
      if(catPos[0] === 6 && catPos[1] === 0){
        setCatSeq([...catSeq, catPos])
        console.log('Trying to add to arr', catSeq)
        console.log('red')
      }
      handleCatMvmnt()
      return newPos;
    });
  };

  function handleCatMvmnt() {
    if(timer > 0 && blinkSequence.length === 5){
        // only track the coordinates if its the coordinates of the sprites
        // compare the coordinates of blinkSeq and catSeq to see if they did it right
        // resetting the round: resetting the catPos, timer, blinkSeq, catSeq

           
    }
    // theres a delay in capturing catPos + checking it against the condn'ls
    // also there's no way to verify if it was done under 30 seconds yet (i.e. no penalty reward)
    // if (catPos[0] === 0 && catPos[1] === 6) {
    // //   console.log('cat is drinking water')
    //   setPoints(points + 100);
    // //   console.log(points)
    // }
    // if (catPos[0] === 6 && catPos[1] === 0) {
    //   console.log('cat is scratching')
    //   setPoints(points + 100);
    // //   console.log(points)
    // }
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

        //     <div>
        //   {stateVariable ? <div id="divCheckbox">:  <div id="divCheckbox" style="display: none;">)}
        // </div>

        // pushing into the row a div for each tile
        row.push(
          <div
            // each tile is given a unique indentifier of it's [x,y] pos
            key={squareKey}
            // either its a dark or a light tile
            className={squareClass}
            // each tile had an event handler that simply console logs which tile was clicked and where
            onClick={() => handleClick(i, j)}
          // either null value or the sprite pos passed in
          >
            {waterBowl}
            {[i,j]}
            {scratchPad}
            {cat}
          </div>
        );
      }
      // the board will have a unique key of its i pos and the row arr
      board.push(<div key={i} className="row">{row}</div>);
    }
    return board;
  }

  return (
    <div className="board" onKeyDown={handleKeyDown} tabIndex="0">
      {createBoard()}
    </div>
  );
 }


export default Mainboard;