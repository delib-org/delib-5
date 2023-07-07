import { onAuthStateChanged } from 'firebase/auth';
import  { useState } from 'react'
import { auth } from '../db/auth';

const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false)
    onAuthStateChanged(auth, (user) => {
        try {

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user

                setIsLogged(true)
               
            } else {
                // User is signed out
             
                setIsLogged(false)
            }
        } catch (error) {
            setIsLogged(false)
        }
    });
    return isLogged;
}

export default useAuth