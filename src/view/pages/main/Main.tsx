import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fav from '../../components/fav/Fav';

import { listenStatmentsSubsciptions } from '../../../functions/db/statements/getStatement';
import { Statement, StatementSubscription } from '../../../model/statementModel';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatementSubscription, statementSubscriptionSelector, statementsSelector } from '../../../model/slices/statements/statementsSlice';
import { auth } from '../../../functions/db/auth';
import useAuth from '../../../functions/hooks/authHooks';

let unsubscribe: Function = () => { };

const Main = () => {
    const navigate = useNavigate();
    const statements = useAppSelector(statementSubscriptionSelector);
    const isLgged = useAuth();
    const dispatch = useAppDispatch();
    
    function updateStoreStSubCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription));
    }

    useEffect(() => {
    console.log(isLgged)
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
        <div>
            <h1>Main</h1>
            <Fav onclick={handleAddStatment} />

            {statements.map((statement: StatementSubscription) => <p key={statement.statement.statementId}>{statement.statement.statement}</p>)}
        </div>
    )
}

export default Main