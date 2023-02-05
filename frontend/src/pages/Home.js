import React, { useEffect, useState } from 'react'
import  AttendeesDetails from '../components/AttendeesDetails/AttendeesDetails'

const Home = () => {
    const [attendees, setAttendees] = useState(null)


    useEffect(() => {
        const fetchAttendees = async () => {
            const response = await fetch('http://localhost:8000/attendees')
            const json = await response.json();

            if (response.ok) {
                setAttendees(json)
            }
        }

        fetchAttendees();
    }, [])
    
  return (
    <div className='home'>
        <div className='attendees'>
            {attendees && attendees.map((attendees) => (
                <AttendeesDetails key={attendees.id} attendees={attendees}/>
            ))}
        </div>
    </div>
  )
}

export default Home