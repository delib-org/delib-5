import { FC } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth'

interface Props {
  statement: Statement
  showImage:Function
}

const StatementChat: FC<Props> = ({ statement, showImage}) => {

  const userId = auth.currentUser?.uid;
  const userProfile = statement.creator.photoURL;
  const creatorId = statement.creatorId;

  const isMe = userId === creatorId;

  return (
    <>

      <div className={isMe ? `statement__chatCard statement__chatCard--me` : "statement__chatCard statement__chatCard--other"}>
        <div onClick={()=>showImage(statement.creator)} className="statement__chatCard__profile" style={userProfile ? { backgroundImage: `url(${userProfile})` } : {}}></div>
        <div className={isMe ? "bubble right" : "bubble left"}>
          {statement.statement}
        </div>
      </div>
    </>
  )
}

export default StatementChat