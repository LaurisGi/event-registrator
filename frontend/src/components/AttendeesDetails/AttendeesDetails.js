import React from 'react'

const AttendeesDetails = ({attendee}) => {
  return (
    <div className='attendees-details'>
        <h4><strong>Name:</strong>{attendee.name}</h4>
        <p><strong>Name:</strong>{attendee.name}</p>
        <p><strong>Surname:</strong>{attendee.surname}</p>
        <p><strong>Email:</strong>{attendee.email}</p>
        <p><strong>Phone:</strong>{attendee.phone}</p>
    </div>
  )
}

export default AttendeesDetails