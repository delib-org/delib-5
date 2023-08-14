import React, { FC, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getIsSubscribed, listenToStatement, listenToStatementSubscription, listenToStatementsOfStatment } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, setStatementSubscription, statementNotificationSelector, statementSelector, statementSubsSelector, statementSubscriptionSelector } from '../../../model/statements/statementsSlice';
import { Statement, StatementSubscription } from '../../../model/statements/statementModel';
import StatementInput from './StatementInput';
import StatementChat from '../../features/statement/StatementChat';
import { Role } from '../../../model/role';
import { setStatmentSubscriptionNotificationToDB, setStatmentSubscriptionToDB } from '../../../functions/db/statements/setStatments';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { User } from '../../../model/users/userModel';
import { User } from '../../../model/users/userModel';


//icons
import ShareIcon from '../../icons/ShareIcon';
import ArrowBackIosIcon from '../../icons/ArrowBackIosIcon';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { setEvaluation } from '../../../functions/db/evaluation/setEvaluation';
import { Evaluation } from '../../../model/evaluations/evaluationModel';
import { setEvaluationToStore } from '../../../model/evaluations/evaluationsSlice';
import { listenToEvaluations } from '../../../functions/db/evaluation/getEvaluation';
import StatementNav from '../../features/statement/StatementNav';
import StatementMain from '../../features/statement/StatementMain';


let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
let unsubStatementSubscription: Function = () => { };
let unsubEvaluations: Function = () => { };

// const askNotification = ("Notification" in window && Notification.permission !== "granted")


const Statement: FC = () => {

    const [talker, setTalker] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const { statementId } = useParams();
  


    //check if the user is registered

    const statement = useAppSelector(statementSelector(statementId));
    const statementSubs = useAppSelector(statementSubsSelector(statementId));
    const statementSubscription: StatementSubscription | undefined = useAppSelector(statementSubscriptionSelector(statementId));
    const role: any = statementSubscription?.role || Role.member;

    const hasNotifications = useAppSelector(statementNotificationSelector(statementId));

    //store callbacks
    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }
    function updateStatementSubscriptionCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription))
    }

    function updateEvaluationsCB(evaluation: Evaluation) {
        dispatch(setEvaluationToStore(evaluation))
    }

    //handlers
    function handleShowTalker(_talker: User | null) {
        if (!talker) {
            setTalker(_talker);
        } else {
            setTalker(null);
        }
    }

    function handleShare() {
        const shareData = {
            title: "דליב: יוצרים הסכמות ביחד",
            text: `מוזמנים: ${statement?.statement}`,
            url: `https://delib-5.web.app/home/statement/${statementId}`,
        };
        navigator.share(shareData);
    }

    function handleRegisterToNotifications() {
        setStatmentSubscriptionNotificationToDB(statement, role)
    }

    

    

    useEffect(() => {
        if (statementId) {

            unsub = listenToStatement(statementId, updateStoreStatementCB);
            unsubSubStatements = listenToStatementsOfStatment(statementId, updateStoreStatementCB);
            unsubStatementSubscription = listenToStatementSubscription(statementId, updateStatementSubscriptionCB);
            unsubEvaluations = listenToEvaluations(statementId, updateEvaluationsCB);
        }

        return () => {
            unsub();
            unsubSubStatements();
            unsubStatementSubscription();
            unsubEvaluations();
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



    //JSX
    return (
        <>

            {talker ? <div onClick={() => { handleShowTalker(null) }}>
                <ProfileImage user={talker} />
            </div> : null}
            <div className="page__header">
                <div className='page__header__wrapper'>
                    <Link to="/home"><ArrowBackIosIcon /></Link>
                    <div onClick={handleRegisterToNotifications}>
                        {hasNotifications ? <NotificationsOffIcon /> : <NotificationsActiveIcon />}
                    </div>
                    <h1>{statement?.statement}</h1>
                    <div onClick={handleShare}><ShareIcon /></div>
                </div>
                {statement?<StatementNav statement={statement} />:null} 
            </div>
           {statement?<StatementMain statement={statement} statementsSub={statementSubs} handleShowTalker={handleShowTalker}/>:null}

        </>
    )
}

export default React.memo(Statement);