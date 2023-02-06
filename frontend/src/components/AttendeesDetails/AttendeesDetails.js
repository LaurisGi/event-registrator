import { useAttendeesContext } from '../hooks/useAttendeesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const AttendeesDetails = ({ attendee }) => {
    const {dispatch } = useAttendeesContext()
    const { user } = useAuthContext();


const handleClick = async () => {
  if (!user) {
    return 
  } 
  if (window.confirm('Do you really want to delete this attendee?')) {
  const response = await fetch('http://localhost:8000/attendees/' + attendee.id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  const json = await response.json()

  if (response.ok) {
    dispatch({type: 'DELETE_ATTENDEE', payload: json})
  }
}}

  return (
    <div className='attendees-details'>
        <h4><strong>Name:</strong>{attendee.name}</h4>
        <p><strong>Name:</strong>{attendee.name}</p>
        <p><strong>Surname:</strong>{attendee.surname}</p>
        <p><strong>Email:</strong>{attendee.email}</p>
        <p><strong>Phone:</strong>{attendee.phone}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default AttendeesDetails
