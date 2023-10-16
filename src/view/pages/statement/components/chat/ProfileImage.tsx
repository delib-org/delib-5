import { Statement } from 'delib-npm';
import { FC } from 'react';

interface Props {
    statement: Statement;
    showImage: Function;
}

const ProfileImage:FC<Props>= ({statement, showImage}) => {
    const userProfile = statement.creator.photoURL;
    console.log(statement.creator)

    return (
        <>
         <div onClick={() => showImage(statement.creator)} className="statement__chatCard__profile" style={userProfile ? { backgroundImage: `url(${userProfile})` } : {backgroundImage:'pink'}}>
            {userProfile?null:<span>{statement.creator.displayName}</span>}
         </div>
        </>
    )
}

export default ProfileImage