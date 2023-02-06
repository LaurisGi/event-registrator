import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

    export const useSignup = () => {
        const [error, setError] = useState(null)
        const [isLoading, setIsLoading] = useState(null)
        // const { dispatch } = useAuthContext()

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
            }
            if (response.ok) {
                // dispatch({type: 'LOGIN', payload: json})
                setError(json.message)
                setIsLoading(false);
            }
        }
        return { signup, isLoading, error }
    }