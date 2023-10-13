import { FC } from 'react'
import { User } from 'delib-npm'

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