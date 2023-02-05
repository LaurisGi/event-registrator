import { createContext, useReducer } from "react";

export const AttendeesContext = createContext();

export const attendeesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ATTENDEES': 
            return {
                attendees: action.payload
            }
        case 'CREATE_ATTENDEE':
            return {
                attendees: [action.payload, ...state.attendees]
            }
        default: 
            return state
    }
}

export const AttendeesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(attendeesReducer, {
        attendees: null
    })

    return (
        <AttendeesContext.Provider value={{...state, dispatch}}>
            {children}
        </AttendeesContext.Provider>
    )
}