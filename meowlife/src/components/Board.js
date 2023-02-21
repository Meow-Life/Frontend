import './Board.css'
import Tiles from './Tiles'
import { useState, useEffect } from 'react';

// creating the board using h + v axis
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2','3','4','5','6','7','8'];
// arr to store the sprites to then be rendered 
 class Piece {
    constructor(image, x, y){
        this.image = image;
        this.x = x;
        this.y = y;
    }
}

const pieces = [new Piece('assets/imgs/cat-bowl.png', 0, 2), new Piece('assets/imgs/cats-water-bowl.png', 0, 4), new Piece('assets/imgs/output-onlineimagetools.png', 0, 7), new Piece('assets/imgs/output-onlineimagetools.png', 1, 7), new Piece('assets/imgs/output-onlineimagetools.png', 2, 7), new Piece('assets/imgs/output-onlinepngtools.png', 5, 4)];

//pieces.push({image: '', x: 0, y: 6})
//console.log(pieces)

export default function Board(){
    // arr to store tiles of board
    let board = [];
    // state variables to track levels
    let [catHearts, updateHearts] = useState(3);
    let [userPoints, updatePoints] = useState(200);
    let [hungerLvl, updateHunger] = useState(0);
    let [thirstLvl, updateThirst] = useState(0);

    // on mount of the app, i want the levels to be dynamically + randomly updated to mimic real-life hunger or thirst etc
    useEffect(() => {
    const hungerLvlTimer = setInterval(() => {
        let interval = Math.floor(Math.random() * 100) + 1
        // here is where the hungerLvl is being dynamically updated
        updateHunger(interval)
        // if hungerLvl is < 50, don't feed the cat and so the button should be unclickable
        if(hungerLvl < 50){
           // console.log('not hungry yet', hungerLvl)
            // else, meow should go off, button should be clickable, then track users success or failure in objective
        } else{
          //  console.log('hungies:', hungerLvl)
        }
    }, 3000)
    return () => clearInterval(hungerLvlTimer)
}, [hungerLvl])

useEffect(() => {
    const thirstLvlTimer = setInterval(() => {
        let interval = Math.floor(Math.random() * 100) + 1
        updateThirst(interval)
        if(thirstLvl < 50){
           // console.log('not thirsty yet', thirstLvl)
        } else{
          //  console.log('thirsty:', thirstLvl)
        }
    }, 5000)
    return () => clearInterval(thirstLvlTimer)
}, [thirstLvl])

// creating the x and y axis tiles, starting from left to right as JS renders them like this
  for(let y  = verticalAxis.length-1; y >= 0; y--){
   for(let x = 0; x < horizontalAxis.length; x++){
       const number = y + x + 2;
       //console.log(y, x)
        let image = undefined;

        pieces.forEach((p) => {
            //console.log(p.image)
            if(p.x === x && p.y === y){
                image = p.image;
            }
        })
       // tracking the number to then manipulate on the UI and giving it an id of its coordinates on the board
            board.push(<Tiles image={image} hungerLvl={hungerLvl} updateHunger={updateHunger} thirstLvl={thirstLvl} updateThirst={updateThirst} userPoints={userPoints} updatePoints={updatePoints} catHearts={catHearts} updateHearts={updateHearts} number={number} x={x} y={y}/>)
   }
  }
  console.log('h:',hungerLvl, 't:', thirstLvl)
    return (
        <div id="board">
            {board}
        </div>
    )
}