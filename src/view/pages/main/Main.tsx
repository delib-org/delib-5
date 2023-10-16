import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fav from '../../components/fav/Fav';

import { listenStatmentsSubsciptions } from '../../../functions/db/statements/getStatement';
import { StatementSubscription } from 'delib-npm';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatementSubscription, statementsSubscriptionsSelector } from '../../../model/statements/statementsSlice';
import useAuth from '../../../functions/hooks/authHooks';
import { setUser } from '../../../model/users/userSlice';
import { logOut } from '../../../functions/db/auth';
import StatementCard from '../statement/components/StatementCard';
import { install } from '../../../main';

//install


let unsubscribe: Function = () => { };

const Main = () => {
    const navigate = useNavigate();
    const statements = [...useAppSelector(statementsSubscriptionsSelector)].sort((a, b) => b.lastUpdate - a.lastUpdate);
    const isLgged = useAuth();
    const dispatch = useAppDispatch();

    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    // const [isApp, setIsApp] = useState(false);

    function updateStoreStSubCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription));
    }

    useEffect(() => {

       setDeferredPrompt(install.deferredPrompt);
      
    }, [])

    useEffect(() => {

        if (isLgged) {
            unsubscribe = listenStatmentsSubsciptions(updateStoreStSubCB);
        }
        return () => {
            unsubscribe()
        }
    }, [isLgged])
   


    function handleInstallApp() {
        try {
            const deferredPrompt = install.deferredPrompt;
            console.log('handleInstallApp')
            console.log(deferredPrompt)
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult: any) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    }
                    setDeferredPrompt(null);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddStatment() {
        navigate('/home/addStatment')
    }

    function handleLogout() {
        logOut();
        dispatch(setUser(null))
    }
    return (
        <div className='page'>
            <div className="page__header">
                <h1>דליב</h1>
                <h2> יוצרים הסכמות </h2>
                <div className="btns">
                    <button onClick={handleLogout}>התנתקות</button>
                    {deferredPrompt?<button onClick={handleInstallApp}>התקנת האפליקציה</button>:null}
                </div>
            </div>
            <div className="page__main">
                <div className="wrapper">
                    <h2>שיחות</h2>
                    {statements.map((statement: StatementSubscription) => <StatementCard key={statement.statement.statementId} statement={statement.statement} />)}
                </div>
            </div>
            <Fav onclick={handleAddStatment} />
        </div>
    )
}

export default React.memo(Main)