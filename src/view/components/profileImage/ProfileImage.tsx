import { FC } from 'react'
import { User } from '../../../model/users/userModel'
import { getUserFromFirebase } from '../../../functions/db/users/usersGeneral';

interface Props {
    user: User | null
}
const ProfileImage: FC<Props> = ({ user }) => {
    if (!user) return null;
    return (
        <>
         
        <div className='profileImage'>
            <div className="profileImage__box">
                <div className="profileImage__img" style={{ backgroundImage: `url(${user.photoURL})` }}></div>
                <h3>{user.displayName}</h3>
            </div>
        </div>
        </>
    )
}

export default ProfileImage