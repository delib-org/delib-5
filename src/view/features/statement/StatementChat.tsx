import { FC } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth'

interface Props {
  statement: Statement
}

const StatementChat: FC<Props> = ({ statement }) => {
  const userId = auth.currentUser?.uid;
  const userProfile = auth.currentUser?.photoURL;
  const creatorId = statement.creatorId;
  const isMe = userId === creatorId ? "statement__chatCard--me" : "statement__chatCard--other";

  return (
    <>

      <div className={`statement__chatCard ${isMe}`}>
        <div className="statement__chatCard__profile" style={userProfile?{backgroundImage:`url(${userProfile})`}:{}}></div>
        <div className="statement__chatCard__main"> {statement.statement}</div>
      </div>
    </>
  )
}

export default StatementChat