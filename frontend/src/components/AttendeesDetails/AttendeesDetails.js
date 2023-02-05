import React from 'react'

const AttendeesDetails = ({attendees}) => {
  return (
    <div className='attendees-details'>
        <h4><strong>Name:</strong>{attendees.name}</h4>
        <p><strong>Name:</strong>{attendees.name}</p>
        <p><strong>Surname:</strong>{attendees.surname}</p>
        <p><strong>Email:</strong>{attendees.email}</p>
        <p><strong>Phone:</strong>{attendees.phone}</p>
    </div>
  )
}

export default AttendeesDetails