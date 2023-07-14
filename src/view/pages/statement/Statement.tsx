import { FC, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getIsSubscribed, listenToStatement, listenToStatementsOfStatment } from '../../../functions/db/statements/getStatement';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { setStatement, statementSelector, statementSubsSelector } from '../../../model/statements/statementsSlice';
import { Statement } from '../../../model/statements/statementModel';
import StatementInput from './StatementInput';
import StatementChat from '../../features/statement/StatementChat';
import { Role } from '../../../model/role';
import { setStatmentSubscriptionToDB } from '../../../functions/db/statements/setStatments';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { User } from '../../../model/users/userModel';

let firstTime = true
let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };


const Statement: FC = () => {
    const [talker, setTalker] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const { statementId } = useParams();
    const messagesEndRef = useRef(null)

    //check if the user is registered

    const statement = useAppSelector(statementSelector(statementId));
    const statementSubs = useAppSelector(statementSubsSelector(statementId));

    function updateStoreStatementCB(statement: Statement) {
        dispatch(setStatement(statement))
    }

    function handleShowTalker(_talker: User | null) {
        if (!talker) {
            setTalker(_talker);
        } else {
            setTalker(null);
        }
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
        <div className="page">
            <div onClick={() => { handleShowTalker(null) }}>
                <ProfileImage user={talker} />
            </div>
            <div className="page__header">
                <Link to="/home"><button>Back</button></Link>
                <h1>{statement?.statement}</h1>
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

        </div>
    )
}

export default Statement