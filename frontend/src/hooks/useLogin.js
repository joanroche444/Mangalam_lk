import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {  
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'Login failed');
            }

            const userData = {
                email: json.email,
                firstName: json.firstName,
                lastName: json.lastName,
                role: json.role,
                _id: json._id,
                token: json.token
            };

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(userData));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: userData });

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}