import React, { useEffect } from 'react'
import  AttendeesDetails from '../components/AttendeesDetails/AttendeesDetails'
import AttendeesForm from '../components/AttendeesDetails/AttendeesForm'
import { useAttendeesContext } from '../components/hooks/useAttendeesContext'

const Home = () => {
    const {attendees, dispatch} = useAttendeesContext()


    useEffect(() => {
        const fetchAttendees = async () => {
            const response = await fetch('http://localhost:8000/attendees')
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_ATTENDEES', payload: json})
            }
        }

        fetchAttendees();
    }, [])
    
  return (
    <div className='home'>
        <div className='attendees'>
            {attendees && attendees.map((attendee) => (
                <AttendeesDetails attendee={attendee} key={attendee.id}/>
            ))}
        </div>
        <AttendeesForm />
    </div>
  )
}

export default Home