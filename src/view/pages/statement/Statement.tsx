import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getIsSubscribed, listenToStatement, listenToStatementSubscription, listenToStatementsOfStatment } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, setStatementSubscription, statementNotificationSelector, statementSelector, statementSubsSelector, statementSubscriptionSelector } from '../../../model/statements/statementsSlice';
import { Statement, StatementSubscription } from 'delib-npm';
import { Role } from '../../../model/role';
import { setStatmentSubscriptionNotificationToDB, setStatmentSubscriptionToDB, updateSubscriberForStatementSubStatements } from '../../../functions/db/statements/setStatments';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { User, Screen } from 'delib-npm';
import { userSelector } from '../../../model/users/userSlice';

import { Evaluation } from '../../../model/evaluations/evaluationModel';
import { setEvaluationToStore } from '../../../model/evaluations/evaluationsSlice';
import { listenToEvaluations } from '../../../functions/db/evaluation/getEvaluation';




import StatementNav from './components/nav/StatementNav';
import StatementMain from './components/StatementMain';
import StatementOptions from './components/options/StatementOptions';
import StatementVote from './components/vote/StatementVote';

//icons
import ShareIcon from '../../icons/ShareIcon';
import ArrowBackIosIcon from '../../icons/ArrowBackIosIcon';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { SetStatementComp } from './components/set/SetStatementComp';
import StatmentRooms from './components/rooms/StatmentRooms';
import { pageOut } from '../../../main';




let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
let unsubStatementSubscription: Function = () => { };
let unsubEvaluations: Function = () => { };


const Statement: FC = () => {

    const [talker, setTalker] = useState<User | null>(null);
    const [title, setTitle] = useState<string>('קבוצה');
    const dispatch = useAppDispatch();
    const { statementId, page } = useParams();
    const screen: string | undefined = page;

    //check if the user is registered

    const statement = useAppSelector(statementSelector(statementId));
    const subStatements = useAppSelector(statementSubsSelector(statementId));
    const statementSubscription: StatementSubscription | undefined = useAppSelector(statementSubscriptionSelector(statementId));
    const role: any = statementSubscription?.role || Role.member;
    const user = useAppSelector(userSelector);
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
        return () => {
           pageOut.pageOut = Statement;
        }
    },[])



    useEffect(() => {
        if (statementId) {
            unsub = listenToStatement(statementId, updateStoreStatementCB);
        }

        return () => {
            unsub();

        }
    }, [statementId])

    useEffect(() => {
        if (user && statementId) {
            unsubSubStatements = listenToStatementsOfStatment(statementId, updateStoreStatementCB);
            unsubStatementSubscription = listenToStatementSubscription(statementId, updateStatementSubscriptionCB);
            unsubEvaluations = listenToEvaluations(statementId, updateEvaluationsCB)
        }

        return () => {
            unsubSubStatements();
            unsubStatementSubscription();
            unsubEvaluations();
        }
    }, [user, statementId])

    useEffect(() => { }, [statementId])

    useEffect(() => {
        if (statement) {

            const __title = statement.statement.split('\n')[0] || statement.statement;
            const _title = __title.replace('*', '');
            setTitle(_title);


            (async () => {

                const isSubscribed = await getIsSubscribed(statementId)

                // if isSubscribed is false, then subscribe
                if (!isSubscribed) {
                    // subscribe
                    setStatmentSubscriptionToDB(statement, Role.member, true)
                }
            })();


            //update subscribed field
            updateSubscriberForStatementSubStatements(statement);

        }
    }, [statement])

    //first line of the statement and remove * from the title


    //JSX
    return (
        <div className='page'>

            {talker ? <div onClick={() => { handleShowTalker(null) }}>
                <ProfileImage user={talker} />
            </div> : null}
            <div className="page__header">
                <div className='page__header__wrapper'>
                    <Link to={statement?.parentId === "top" ? "/home" : `/home/statement/${statement?.parentId}`}><ArrowBackIosIcon /></Link>
                    <div onClick={handleRegisterToNotifications}>
                        {hasNotifications ? <NotificationsOffIcon /> : <NotificationsActiveIcon htmlColor='lightgray' />}
                    </div>
                    <h1>{title}</h1>
                    <div onClick={handleShare}><ShareIcon /></div>
                </div>
                {statement ? <StatementNav statement={statement} /> : null}
            </div>
            {switchScreens(screen, statement, subStatements, handleShowTalker)}

        </div>
    )
}

export default Statement;

function switchScreens(screen: string | undefined, statement: Statement | undefined, subStatements: Statement[], handleShowTalker: Function) {
    try {
        if (!statement) return null;

        switch (screen) {
            case Screen.HOME:
                return <StatementMain statement={statement} subStatements={subStatements} handleShowTalker={handleShowTalker} />
            case Screen.CHAT:
                return <StatementMain statement={statement} subStatements={subStatements} handleShowTalker={handleShowTalker} />
            case Screen.OPTIONS:
                return <StatementOptions statement={statement} subStatements={subStatements} handleShowTalker={handleShowTalker} />
            case Screen.VOTE:
                return <StatementVote statement={statement} subStatements={subStatements} />
                case Screen.GROUPS:
                    return <StatmentRooms statement={statement} subStatements={subStatements} />
            case Screen.SETTINGS:
                return <SetStatementComp />
            default:
                return <StatementMain statement={statement} subStatements={subStatements} handleShowTalker={handleShowTalker} />
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}