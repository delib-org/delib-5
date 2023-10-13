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

let unsubscribe: Function = () => { };

const Main = () => {
    const navigate = useNavigate();
    const statements = [...useAppSelector(statementsSubscriptionsSelector)].sort((a, b) => b.lastUpdate - a.lastUpdate);
    const isLgged = useAuth();
    const dispatch = useAppDispatch();

    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    function updateStoreStSubCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription));
    }

    useEffect(() => {

        //@ts-ignore
        if (window.navigator && (window.navigator.standalone || window.navigator.userAgentData || window.navigator.getInstalledRelatedApps)) {
            alert("The web app is installed as a PWA.");
        } else {
            alert("The web app is not installed as a PWA.");
        }


        window.addEventListener('beforeinstallprompt', (e) => {

            e.preventDefault();

            console.log('beforeinstallprompt fired');
           

            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            // showInstallPromotion();
        });
    }, [])

    useEffect(() => {

        if (isLgged) {
            unsubscribe = listenStatmentsSubsciptions(updateStoreStSubCB);
        }
        return () => {
            unsubscribe()
        }
    }, [isLgged])
    // Access the client



    function handleInstallApp() {
        try {
            console.log('handleInstallApp')
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
                    <button onClick={handleInstallApp}>התקנת האפליקציה</button>
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