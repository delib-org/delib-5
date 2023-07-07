import { useEffect } from 'react';
import { googleLogin } from '../../../functions/db/auth'
import useAuth from '../../../functions/hooks/authHooks'
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();
    const isLOgged = useAuth();
    console.log(isLOgged)
    useEffect(() => {
        if (isLOgged)
            navigate('/home');
    }, [isLOgged])
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