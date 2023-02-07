import { useAuthContext } from "./useAuthContext"
import { useAttendeesContext } from "./useAttendeesContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: attendeesDispatch } = useAttendeesContext();

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        attendeesDispatch({type: 'SET_ATTENDEES', payload: null})
    }
    return {logout}
}