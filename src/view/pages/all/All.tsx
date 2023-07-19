import {useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { listenToAuth } from '../../../functions/db/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../model/users/userSlice';
import { User } from '../../../model/users/userModel';
import { setIntialLocationSessionStorage } from '../../../functions/general/helpers';

const All = () => {
    const location = useLocation();
   
    const dispatch = useDispatch();
    function updateUserToStore(user:User | null){
        dispatch(setUser(user))
    };
    useEffect(() => { 
        listenToAuth(updateUserToStore);
        setIntialLocationSessionStorage(location.pathname);

    }, []);

    return (
        <>
            <Outlet />
        </>
    )
}

export default All