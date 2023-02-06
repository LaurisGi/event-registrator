import React from 'react'
import { useState } from 'react';
import { useLogin } from '../components/hooks/useLogin';
import { Link } from 'react-router-dom';


    const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin()
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      await login(email, password)
    }
    return (
        <>
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email</label>
            <input
                required
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            />
            <label>Email</label>
            <input
                required
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            />
                {error && <div className='error'>{error}</div>}
            <button disabled={isLoading}>Log in</button>
        </form>
        <Link to="/login">Login</Link>
        </>
      )
    }

    export default Login