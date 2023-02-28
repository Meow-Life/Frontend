import { useContext } from "react"
import AppContext from "../Context/Context.js"


export default function Register(){
    const {name, setName, email, setEmail, pswd, setPswd, catName, setCatName}  = useContext(AppContext)

    function handleSubmit(e){
        console.log('submitted form', e.target.name)
        e.preventDefault();
    }

    console.log(name, email, pswd, )
    return(
        <div id='register-user'>
            <form id='registering-form' onSubmit={handleSubmit}>

                <label>Enter your name</label>
                <input type='text' required value={name}  onChange={(e) => setName(e.target.value)}></input>

                <label>Enter your email</label>
                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <label>Enter a password</label>
                <input type='password' required value={pswd} onChange={(e) => setPswd(e.target.value)}></input>

                <label>What is your cat's name?</label>
                <input type='text' required value={catName} onChange={(e) => setCatName(e.target.value)}></input>

                <button type="submit">Sign Meow Up</button>
            </form>
        </div>
    )
}