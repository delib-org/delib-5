import { useEffect } from 'react';
import { googleLogin } from '../../../functions/db/auth'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../functions/hooks/reduxHooks';
import { userSelector } from '../../../model/users/userSlice';

const Start = () => {
    const navigate = useNavigate();
    const user = useAppSelector(userSelector)
 
    useEffect(() => {
        console.log(user)
        if (user){
            navigate('/home');
          
        }else{
            console.log('not logged')
        }
    }, [user])
    
    
    return (
        <div
            className='page splashPage'
        >
            <div className='centerElement'>
                <div id='login__splashName' className='opacity07'>
                    Delib
                </div>
                <div id='login__splashSubName' className='opacity07'>
                    יוצרים הסכמות
                </div>
                <h1 className='login__callForAction'>call for action</h1>
                <div className='anonymousLogin'>
                    <input type='text' className='inputLogin' placeholder='כינוי' />
                    <div className="buttons loginButton" >
                        <div>התחברות עם משתמש זמני</div>
                    </div>
                </div>
                <p> -- או -- </p>
                <div className="buttons loginButton" onClick={googleLogin}>
                    <div>התחברות עם גוגל</div>
                </div>

            </div>
        </div >
    )
}

export default Start