import { useAttendeesContext } from '../hooks/useAttendeesContext'

const AttendeesDetails = ({ attendee }) => {
    const {dispatch } = useAttendeesContext()


const handleClick = async () => {
  const response = await fetch('/atendees' + attendee.id, {
    method: 'DELETE'
  })
  const json = await response.json()

  if (response.ok) {
    dispatch({type: 'DELETE_ATTENDEE', payload: json})
  }
}

  return (
    <div className='attendees-details'>
        <h4><strong>Name:</strong>{attendee.name}</h4>
        <p><strong>Name:</strong>{attendee.name}</p>
        <p><strong>Surname:</strong>{attendee.surname}</p>
        <p><strong>Email:</strong>{attendee.email}</p>
        <p><strong>Phone:</strong>{attendee.phone}</p>
        <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default AttendeesDetails