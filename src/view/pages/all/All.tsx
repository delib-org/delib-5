import {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { listenToAuth } from '../../../functions/db/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../model/users/userSlice';
import { User } from '../../../model/users/userModel';

const All = () => {
    const dispatch = useDispatch();
    function updateUserToStore(user:User | null){
        dispatch(setUser(user))
    };
    useEffect(() => { 
        listenToAuth(updateUserToStore);
    }, [])
    return (
        <>
            <Outlet />
        </>
    )
}

export default All