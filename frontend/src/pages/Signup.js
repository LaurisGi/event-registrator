import React from 'react'
import { useState } from 'react';
import { useSignup } from '../components/hooks/useSignup';
import { Link } from 'react-router-dom';


    const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, success, isLoading, emptyFields } = useSignup()
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      await signup(name, surname, email, password)
      setName('')
      setSurname('')
      setEmail('')
      setPassword('')
    }
    return (
        <>
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>Name</label>
            <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Surname</label>
            <input
                onChange={(e)=> setSurname(e.target.value)}
                value={surname}
                className={emptyFields.includes('surname') ? 'error' : ''}
            />
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
                {success && <div className='success'><Link to='/login'>{success}</Link></div>}
                {error && <div className='error'>{error}</div>}
            <button disabled={isLoading}>Register</button>
        </form>
        </>
      )
    }

    export default Signup