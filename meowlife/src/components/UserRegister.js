import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../Context/Context.js"
import './UserRegister.css'

export default function Register(){
    const {name, setName, email, setEmail, pswd, setPswd, catName, setCatName}  = useContext(AppContext)
    const navigate = useNavigate();

    function handleSubmit(e){
        console.log('submitted form', name)
        e.preventDefault();
        navigate('/login')
    }

    const handleRedirection = () => {
        navigate('/login')
    }

    return(
        <div id='register-user'>
            <form id='registering-form' onSubmit={handleSubmit} className='register-form'>
               
                <h2 style={{background: 'none', paddingBottom: '15px'}}>Sign-Up Below</h2>

                <label>Enter your name</label>
                <input type='text' required value={name}  onChange={(e) => setName(e.target.value)}></input>

                <label>Enter your email</label>
                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <label>Enter a password</label>
                <input type='password' required value={pswd} onChange={(e) => setPswd(e.target.value)}></input>

                <label>What is your cat's name?</label>
                <input type='text' required value={catName} onChange={(e) => setCatName(e.target.value)}></input>

                <button type="submit" className="submit-buttons">Sign Meow Up</button>
                <button className="login-link" onClick={handleRedirection}>Already have an account? Login here.</button>
            </form>
        </div>
    )
}