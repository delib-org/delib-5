import { FC, useEffect, useState } from 'react';
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
import ProfileImage from '../../components/profileImage/ProfileImage';
import { getUserFromFirebase } from '../../../functions/db/users/usersGeneral';
import { User } from '../../../model/users/userModel';
import { set } from 'lodash';

let unsub: Function = () => { }
let unsubSubStatements: Function = () => { };
const Statement: FC = () => {
    const [talker, setTalker] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const { statementId } = useParams();
    const user = getUserFromFirebase();

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
                </div>
            </div>
            <div className="page__footer">
                {statement ? <StatementInput statement={statement} /> : null}
            </div>

        </div>
    )
}

export default Statement