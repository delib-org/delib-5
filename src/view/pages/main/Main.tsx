import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fav from '../../components/fav/Fav';

import { listenStatmentsSubsciptions } from '../../../functions/db/statements/getStatement';
import { StatementSubscription } from '../../../model/statements/statementModel';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatementSubscription, statementSubscriptionSelector} from '../../../model/statements/statementsSlice';
import useAuth from '../../../functions/hooks/authHooks';
import StatementCard from '../../features/statement/StatementCard';

let unsubscribe: Function = () => { };

const Main = () => {
    const navigate = useNavigate();
    const statements = [...useAppSelector(statementSubscriptionSelector)].sort((a, b) => b.lastUpdate - a.lastUpdate);
    const isLgged = useAuth();
    const dispatch = useAppDispatch();

    function updateStoreStSubCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription));
    }

    useEffect(() => {

        if (isLgged) {
            unsubscribe = listenStatmentsSubsciptions(updateStoreStSubCB);
        }
        return () => {
            unsubscribe()
        }
    }, [isLgged])
    // Access the client



    function handleAddStatment() {
        navigate('/home/addStatment')
    }
    return (
        <div className='page'>
            <div className="page__header">
                <h1>Main</h1>
            </div>
            <div className="page__main">

                {statements.map((statement: StatementSubscription) => <StatementCard key={statement.statement.statementId} statement={statement.statement} />)}
            </div>
            <Fav onclick={handleAddStatment} />
        </div>
    )
}

export default Main