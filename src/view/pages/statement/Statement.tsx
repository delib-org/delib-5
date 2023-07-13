import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getIsSubscribed, listenToStatement, listenToStatementsOfStatment } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, statementSelector, statementSubsSelector } from '../../../model/statements/statementsSlice';
import { Statement } from '../../../model/statements/statementModel';
import StatementInput from './StatementInput';
import StatementChat from '../../features/statement/StatementChat';
import { auth } from '../../../functions/db/auth';
import { Role } from '../../../model/role';
import { setStatmentSubscriptionToDB } from '../../../functions/db/statements/setStatments';

let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
const Statement: FC = () => {
    const dispatch = useAppDispatch();
    const { statementId } = useParams();
    const user = auth.currentUser;

    //check if the user is registered

    const statement = useAppSelector(statementSelector(statementId));
    const statementSubs = useAppSelector(statementSubsSelector(statementId));

    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }

    useEffect(() => {
        if (statementId) {

            unsub = listenToStatement(statementId, updateStoreStatementCB);
            unsubSubStatements = listenToStatementsOfStatment(statementId, updateStoreStatementCB);

        }

        return () => {
            unsub()
        }
    }, [statementId])

    useEffect(() => {
        if (statement) {

            (async () => {
             
                const isSubscribed = await getIsSubscribed(statementId)
    
                // if isSubscribed is false, then subscribe
                if (!isSubscribed) {
                    // subscribe
                    setStatmentSubscriptionToDB(statement, Role.member)
                }
            })();
        }
    }, [statement])
    return (
        <div className="page statement">
            <Link to="/home"><button>Back</button></Link>
            <h1>{statement?.statement}</h1>
            <div className="page__main wrapper">
                {statementSubs?.map((statement) => <StatementChat key={statement.statementId} statement={statement} />)}
            </div>

            {statement ? <StatementInput statement={statement} /> : null}

        </div>
    )
}

export default Statement