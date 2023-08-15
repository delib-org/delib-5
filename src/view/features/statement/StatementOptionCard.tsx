import { FC, useEffect, useState } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth';
import { setStatementisOption } from '../../../functions/db/statements/setStatments';
import { setEvaluation } from '../../../functions/db/evaluation/setEvaluation';
import { useAppDispatch, useAppSelector } from '../../../functions/hooks/reduxHooks';
import { evaluationSelector } from '../../../model/evaluations/evaluationsSlice';

//icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { setStatementOrder, statementOrderSelector } from '../../../model/statements/statementsSlice';




interface Props {
    statement: Statement
    showImage: Function;
}

let previusOrder = 0;

const StatementOptionCard: FC<Props> = ({ statement, showImage }) => {
    const evaluation = useAppSelector(evaluationSelector(statement.statementId))
    const order = useAppSelector(statementOrderSelector(statement.statementId))


    const [show, setShow] = useState(false)
    const [newOrder, setNewOrder] = useState(order);
    const userId = auth.currentUser?.uid;
    const userProfile = statement.creator.photoURL;
    const creatorId = statement.creatorId;

    const isMe = userId === creatorId;
    const { isOption } = statement;

    useEffect(() => { 
        if (newOrder !== order) {
            setNewOrder(order);
        }   
    }, [order])


    return (
        <>
            <div
                className={isMe ? `statement__options__card statement__options__card--me` : "statement__options__card statement__options__card--other"}
                style={{ top: `${newOrder * 100}px` }}
            >
                <div onClick={() => showImage(statement.creator)} className="statement__chatCard__profile" style={userProfile ? { backgroundImage: `url(${userProfile})` } : {}}></div>
                <div className="statement__options__card__bubble">

                    <div className="statement__options__card__bubble__text">
                        {isOption ? <Thumbs evaluation={evaluation} upDown='up' statement={statement} /> : null}
                        <p onClick={() => setShow(!show)}>{statement.statement}</p>
                        {isOption ? <Thumbs evaluation={evaluation} upDown='down' statement={statement} /> : null}
                    </div>
                    {show ? <div className="statement__bubble__more">
                        <div className="icon" onClick={() => setStatementisOption(statement)}> <LightbulbIcon /></div>
                        {isOption ? <div className="statement__bubble__proCon">
                            <span>{statement.pro ? statement.pro : 0}</span>
                            <ThumbsUpDownIcon className="icon" />
                            <span>{statement.con ? statement.con : 0}</span>
                        </div> : null}
                        <div className="icon" onClick={() => setStatementisOption(statement)}> <ChatIcon /></div>
                    </div> : null}

                </div>
            </div>
        </>
    )
}

interface ThumbsProps {
    evaluation: number
    upDown: "up" | "down";
    statement: Statement
}

const Thumbs: FC<ThumbsProps> = ({ evaluation, upDown, statement }) => {
    if (upDown === "up") {
        if (evaluation > 0) {
            return (
                <ThumbUpIcon className="icon" onClick={() => setEvaluation(statement, 0)} />
            )
        } else {
            return <ThumbUpOffAltIcon className="icon" onClick={() => setEvaluation(statement, 1)} />
        }
    }
    else {
        if (evaluation < 0) {
            return (<ThumbDownIcon className="icon" onClick={() => setEvaluation(statement, 0)} />)
        }
        else {
            return <ThumbDownOffAltIcon className="icon" onClick={() => setEvaluation(statement, -1)} />
        }

    }
}

export default StatementOptionCard;