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
import AskForNotifications from '../../components/notifications/AskForNotifications';

//icons
import ShareIcon from '../../icons/ShareIcon';
import ArrowBackIosIcon from '../../icons/ArrowBackIosIcon';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

let firstTime = true
let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
let unsubStatementSubscription: Function = () => { };

const askNotification = ("Notification" in window && Notification.permission !== "granted")


const Statement: FC = () => {

    const [talker, setTalker] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const { statementId } = useParams();
    const messagesEndRef = useRef(null)


    //check if the user is registered

    const statement = useAppSelector(statementSelector(statementId));
    const statementSubs = useAppSelector(statementSubsSelector(statementId));
    const statementSubscription = useAppSelector(statementSubscriptionSelector(statementId));
    const { role } = statementSubscription || { role: Role.member};
   
    const showAskForNotifications = useAppSelector((state) => state.user.askToSubscribeToNotifications.show);
    const hasNotifications = useAppSelector(statementNotificationSelector(statementId));


    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }
    function updateStatementSubscriptionCB(statementSubscription: StatementSubscription) {
        dispatch(setStatementSubscription(statementSubscription))
    }

    function handleShowTalker(_talker: User | null) {
        if (!talker) {
            setTalker(_talker);
        } else {
            setTalker(null);
        }
    }

    function handleShare() {
        const shareData = {
            title: "Delib: making creating aggrements easy",
            text: `Come join me on Delib!: ${statement?.statement}`,
            url: `https://delib-5.web.app/home/statement/${statementId}`,
        };
        navigator.share(shareData);
    }

    function handleRegisterToNotifications() {
        setStatmentSubscriptionNotificationToDB(statement, role)
    }


    const scrollToBottom = () => {
        if (!messagesEndRef) return;
        if (!messagesEndRef.current) return;
        if (firstTime) {
            //@ts-ignore
            messagesEndRef.current.scrollIntoView({ behavior: "auto" })
            firstTime = false
        } else {
            //@ts-ignore
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => { firstTime = true }, [])

    useEffect(() => {
        if (statementId) {

            unsub = listenToStatement(statementId, updateStoreStatementCB);
            unsubSubStatements = listenToStatementsOfStatment(statementId, updateStoreStatementCB);
            unsubStatementSubscription = listenToStatementSubscription(statementId, updateStatementSubscriptionCB);

        }

        return () => {
            unsub();
            unsubSubStatements();
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

    useEffect(() => {
        scrollToBottom()
    }, [statementSubs]);
    return (
        <>
            {showAskForNotifications ? <AskForNotifications /> : null}
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
                    {askNotification ? <button onClick={handleRegisterToNotifications}>Register to notifications</button> : null}
                    <div onClick={handleShare}><ShareIcon /></div>
                </div>
            </div>
            <div className="page__main">
                <div className="wrapper wrapper--chat">
                    {statementSubs?.map((statement) => (
                        <div key={statement.statementId} onClick={() => handleShowTalker(statement.creator)}>
                            <StatementChat statement={statement} />
                        </div>
                    ))
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="page__footer">
                {statement ? <StatementInput statement={statement} /> : null}
            </div>

        </>
    )
}

export default React.memo(Statement);