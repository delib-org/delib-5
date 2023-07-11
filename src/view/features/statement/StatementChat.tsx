import {FC} from 'react'
import { Statement } from '../../../model/statementModel'

interface Props{
    statement:Statement
}

const StatementChat:FC<Props> = ({statement}) => {
  return (
    <div className='statementChat__card'>{statement.statement}</div>
  )
}

export default StatementChat