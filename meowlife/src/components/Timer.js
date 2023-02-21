import { useState } from 'react'
import 'Timer.css'

export default function Timer(){
    const [ timer, setTimer ] = useState(30)

    return(
        <h1>:{timer}</h1>
    )
}