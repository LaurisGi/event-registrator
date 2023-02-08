import React from 'react'
import { useState } from 'react';
import { useLogin } from '../components/hooks/useLogin';


    const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading, emptyFields} = useLogin();
  
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
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes('email') ? 'error' : ''}
            />
            <label>Password</label>
            <input
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes('password') ? 'error' : ''}
            />
                {error && <div className='error'>{error}</div>}
            <button disabled={isLoading}>Log in</button>
        </form>
        </>
      )
    }

    export default Login