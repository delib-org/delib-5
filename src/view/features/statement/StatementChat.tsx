import {FC} from 'react'
import { Statement } from '../../../model/statementModel'
import { auth } from '../../../functions/db/auth'

interface Props{
    statement:Statement
}

const StatementChat:FC<Props> = ({statement}) => {
  const userId = auth.currentUser?.uid;
  const creatorId = statement.creatorId;
  const isMe = userId === creatorId? "statement__chatCard--me": "statement__chatCard--other";

  return (
    <div className={`statement__chatCard ${isMe}`}>{statement.statement}</div>
  )
}

export default StatementChat