import React, { useState } from 'react'
import { useAttendeesContext } from '../hooks/useAttendeesContext'

const AttendeesForm = () => {
  const {dispatch } = useAttendeesContext();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userId, setUserId] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const attendee = {name, surname, email, phone, userid: userId}
        const response = await fetch('http://localhost:8000/attendees', {
            method: 'POST',
            body: JSON.stringify(attendee),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.message)
        }
        if (response.ok) {
            setName('')
            setSurname('')
            setEmail('')
            setPhone('')
            setUserId('')
            setError(null)
            console.log('New attedee added', json);
            dispatch({type: 'CREATE_ATTENDEE', payload: json})
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
    <h3>Add a New Attendee</h3>

    <label>Name:</label>
    <input 
      type="text"
      onChange={(e) => setName(e.target.value)}
      value={name}
      // className={emptyFields.includes('name') ? 'error' : ''}
    />

    <label>Surname:</label>
    <input 
      type="text"
      onChange={(e) => setSurname(e.target.value)}
      value={surname}
      // className={emptyFields.includes('surname') ? 'error' : ''}
    />
    <label>Email:</label>
    <input 
      type="text"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      // className={emptyFields.includes('email') ? 'error' : ''}
    />

    <label>Phone:</label>
    <input 
      type="number"
      onChange={(e) => setPhone(e.target.value)}
      value={phone}
      // className={emptyFields.includes('phone') ? 'error' : ''}
    />
    <label>Atendee Id:</label>
    <input 
      type="number"
      onChange={(e) => setUserId(e.target.value)}
      value={userId}
      // className={emptyFields.includes('atendee') ? 'error' : ''}
    />

    <button>Add Attendee</button>
    {error && <div className="error">{error}</div>}
  </form>
  )
}

export default AttendeesForm