import { FC } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth'

interface Props {
  statement: Statement
}

const StatementChat: FC<Props> = ({ statement }) => {

  const userId = auth.currentUser?.uid;
  const userProfile = statement.creator.photoURL;
  const creatorId = statement.creatorId;
  console.log(userId === creatorId)
  const isMe = userId === creatorId;

  return (
    <>

      <div className={isMe?`statement__chatCard statement__chatCard--me`:"statement__chatCard statement__chatCard--other"}>
        <div className="statement__chatCard__profile" style={userProfile?{backgroundImage:`url(${userProfile})`}:{}}></div>
        <div className={isMe?"statement__chatCard__main statement__chatCard__main--me":"statement__chatCard__main statement__chatCard__main--other"}> {statement.statement}</div>
      </div>
    </>
  )
}

export default StatementChat