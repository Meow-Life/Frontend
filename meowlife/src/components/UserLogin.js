import './UserLogin.css';
import { useContext, useState } from "react"
import AppContext from "../Context/Context.js"
import { useNavigate } from 'react-router-dom';

export default function UserLogin(){
    const {email, pswd}  = useContext(AppContext)
    const [loginEmail, loginPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        console.log('hi')
        e.preventDefault();
        navigate('/game')
    }
    const handleRedirection = () => {
        navigate('/signup')
        console.log('ho')
    }

    return (
        <>
            <div id="login-user">
                <form onSubmit={handleSubmit} className='login-form'>

                <h2 style={{background: 'none'}}>Login below</h2>

                <label>Enter your email</label>
                <input type='email' required value={email} ></input>

                <label>Enter a password</label>
                <input type='password' required value={pswd} ></input>

                <button type='submit' className="submit-buttons">Log Meow In</button>
                <button className='signup-link' onClick={handleRedirection}>Don't have an account? Sign-up here.</button>

                </form>
            </div>
        </>
        
    )
}