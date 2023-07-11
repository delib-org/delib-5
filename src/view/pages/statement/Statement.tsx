import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { listenToStatement, listenToStatementsOfStatment } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, statementSelector, statementSubsSelector } from '../../../model/slices/statements/statementsSlice';
import { Statement } from '../../../model/statementModel';
import StatementInput from './StatementInput';
import StatementChat from '../../features/statement/StatementChat';

let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
const Statement: FC = () => {
    const dispatch = useAppDispatch();
    const { statementId } = useParams();

    const statement = useAppSelector(statementSelector(statementId));
    const statementSubs = useAppSelector(statementSubsSelector(statementId));

    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }

    useEffect(() => {
        if (statementId)
            unsub = listenToStatement(statementId, updateStoreStatementCB)
            unsubSubStatements = listenToStatementsOfStatment(statementId, updateStoreStatementCB)
        return () => {
            unsub()
        }
    }, [statementId])
    return (
        <div className="page">
            <Link to="/home"><button>Back</button></Link>
            <h1>{statement?.statement}</h1>
            <div className="chatWrapper">
                {statementSubs?.map((statement) => <StatementChat key={statement.statementId} statement={statement} />)}
            </div>
            {statement?<StatementInput statement={statement}  />:null}
        </div>
    )
}

export default Statement