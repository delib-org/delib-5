import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { listenToStatement } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, statementSelector } from '../../../model/slices/statements/statementsSlice';
import { Statement } from '../../../model/statementModel';

let unsub: Function = () => { }
const Statement: FC = () => {
    const dispatch = useAppDispatch();
    const { statementId } = useParams();

    const statement = useAppSelector(statementSelector(statementId));

    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }

    useEffect(() => {
        if (statementId)
            unsub = listenToStatement(statementId, updateStoreStatementCB)

        return () => {
            unsub()
        }
    }, [statementId])
    return (
        <div className="page">
            <Link to="/home"><button>Back</button></Link>
            <h1>{statement?.statement}</h1>
        </div>
    )
}

export default Statement