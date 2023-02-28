import './Board.css'
import Tiles from './Tiles'
import { useState, useEffect, useContext } from 'react';
import AppContext from '../Context/Context';

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


export default function Board(){
    // arr to store tiles of board
    let board = [];
    // state variables to track levels
    const {hungerLvl, updateHunger, thirstLvl, updateThirst, catHearts, updateHearts, userPoints, updatePoints} = useContext(AppContext);

    // on mount of the app, i want the levels to be dynamically + randomly updated to mimic real-life hunger or thirst etc
    useEffect(() => {
    const hungerLvlTimer = setInterval(() => {
        let interval = Math.floor(Math.random() * 100) + 1
        // here is where the hungerLvl is being dynamically updated
        updateHunger(interval)
        }, 3000)
        return () => clearInterval(hungerLvlTimer)
    }, [hungerLvl])

    useEffect(() => {
        const thirstLvlTimer = setInterval(() => {
            let interval = Math.floor(Math.random() * 100) + 1
            updateThirst(interval)
        }, 5000)
        return () => clearInterval(thirstLvlTimer)
    }, [thirstLvl])

// creating the x and y axis tiles, starting from left to right as JS renders them like this
  for(let y  = verticalAxis.length-1; y >= 0; y--){
   for(let x = 0; x < horizontalAxis.length; x++){
       const number = y + x + 2;
        let image = undefined;

        pieces.forEach((p) => {
            if(p.x === x && p.y === y){
                image = p.image;
            }
        })
       // rendering tiles based on their positioning (i.e. blue v pink) & passing in necessary props
            board.push(<Tiles image={image} number={number} x={x} y={y}/>)
   }
  }
  console.log('Board.js', 'h:',hungerLvl, 't:', thirstLvl)
    return (
        <div id="board">
            {board}
        </div>
    )
}