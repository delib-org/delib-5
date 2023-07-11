import { FC } from 'react'
import { Statement } from '../../../model/statementModel'
import { Link } from 'react-router-dom'
interface Props {
    statement: Statement
}

const StatementCard: FC<Props> = ({ statement }) => {
    return (
        <Link to={`/home/statement/${statement.statementId}`}>
            <div className='card statementCard' >
                <h3>{statement.statement}</h3>
                {statement.lastMessage?<p>{statement.lastMessage}</p>:null}
            </div>
        </Link>
    )
}

export default StatementCard