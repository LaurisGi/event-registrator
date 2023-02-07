import { useState } from 'react'

    export const useSignup = () => {
        const [error, setError] = useState(null)
        const [success, setSucces] = useState(null)
        const [isLoading, setIsLoading] = useState(null)


        const signup = async (name, surname, email, password) => {
            setIsLoading(true)
            setError(null)

            const response = await fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name, surname, email, password})
            })
            const json = await response.json()
            if(!response.ok) {
                setIsLoading(false)
                setError(json.message)
                setSucces(null)
            }
            if (response.ok) {
                setSucces(json.message)
                setIsLoading(false);
                setError(null)
            }
        }
        return { signup, isLoading, error, success }
    }