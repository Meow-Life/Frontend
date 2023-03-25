import { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import AppContext from '../Context/Context.js'

const TimerCompo = styled.div`
    font-size: 25px;
    font-family: 'Molisa Delawere', sans-serif;                                           
    color: black; 
    top: 4%;
    right: 22%;
    position: absolute;
    border: 2px solid;
    padding: 10px;
    font-weight: 600;
    width: 35px;
    text-align:center;
`

export default function Timer(){
    const {timer, setTimer} = useContext(AppContext)

    useEffect(() => {
        const timerFunc = setTimeout(() => {
            if(timer !== 0) { 
                setTimer(timer - 1)
             } 
        }, 1000)  

     return () => clearTimeout(timerFunc)
    }, [timer]);

    return(
        <>
            <TimerCompo>
                :{timer}
            </TimerCompo>
        </>
    );
};