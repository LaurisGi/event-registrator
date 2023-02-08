import { AttendeesContext } from "../../context/AtendeesContext";
import { useContext } from "react";


export const useAttendeesContext = () => {
    const context = useContext(AttendeesContext)

    if (!context) {
        throw Error('useAttendeesContext must be used inside an WorkoutsContextProvider');
    }

    return context
}