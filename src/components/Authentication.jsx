import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConnectAccount from './ConnectAccount'

const FormLogin = ({ email, error ,pass,setPass,setEmail, handleForm, handleRegister }) => {
    return(
        <>
        <form className='form-login' onSubmit={handleForm}>
            <div className="input-type">
                <input 
                    type="email" 
                    name='Email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="input-type">
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    value={pass} 
                    onChange={e => setPass(e.target.value)}
                />
                <p style={{color:"red"}}>
                    {error}
                </p>
            </div>

            <div className="sign-in-button">
                <Link to={'/forgot'}>
                    <p>
                        Forgot Password?
                    </p>
                </Link>
            </div>
            <button className='bt-sign-final'>
                Login
            </button>
            <button className="bt-sign-final" onClick={handleRegister}>                
                Register
            </button>
        </form>
        </>
    )
}

const Authentication = ({ setUser }) => {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [error,setError] = useState('')

    const handleForm = async (e) => {
        e.preventDefault();
    
        const userCredentials = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        };
    
        try {
            // const response = await fetch('http://localhost:7777/auth/register', userCredentials);
            const response = await fetch('http://localhost:7777/auth/login', userCredentials);
            const responseData = await response.json();
            console.log(responseData.user);
            console.log(responseData);

            // Check if registration was successful
            if (responseData.message === 'Login successful') {
                setUser(responseData.user)
                navigate('/')
            } else {
                setError(responseData.message)
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleRegister = async(e) => {
        e.preventDefault();
        navigate('/register');
    }


    return (
        <div className='authentication-component'>
            <div className="auth-component">
                <div className="logo">
                    <img src="./img/phone.jpg" alt="" />
                </div>
                <div className="form-component">
                    <FormLogin 
                        email={email} 
                        setEmail={setEmail}
                        pass={pass}
                        setPass={setPass}
                        error={error}
                        handleForm={handleForm}
                        handleRegister={handleRegister}
                    />
                </div>
                {/* <button className='bt-sign-register'> Register </button> */}
                <div className="connect-component">
                    <ConnectAccount/>
                </div>
            </div>
        </div>
    )
}

export default Authentication