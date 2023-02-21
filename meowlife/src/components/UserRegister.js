import { useContext } from "react"
import AppContext from "../Context/Context"

export default function Register(){
    
    const { name, setName } = useContext(AppContext)
    const { email, setEmail } = useContext(AppContext)
    const { pswd, setPswd } = useContext(AppContext)
    const { catName, setCatName } = useContext(AppContext)

    console.log(name, setName, AppContext.Provider)

    function handleSubmit(e){
        console.log('submitted form', e.target, name)
        e.preventDefault();
    }

    return(
        <div id='register-user'>
            <form id='registering-form' onSubmit={handleSubmit}>
                <label>Enter your name</label>
                <input type='text' required  value={name} onChange={(e)=> AppContext.setName(e.target.value)}></input>

                <label>Enter your email</label>
                <input></input>

                <label>Enter a password</label>
                <input></input>

                <label>What is your cat's name?</label>
                <input></input>

                <button type="submit">Sign Meow Up</button>
            </form>
        </div>
    )
}