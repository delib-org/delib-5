import { FC, useEffect, useState, useRef } from 'react'
import { Statement } from 'delib-npm';
import { setEvaluation } from '../../../../../functions/db/evaluation/setEvaluation';
import { useAppDispatch, useAppSelector } from '../../../../../functions/hooks/reduxHooks';
import { evaluationSelector } from '../../../../../model/evaluations/evaluationsSlice';

//icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { setStatementElementHight } from '../../../../../model/statements/statementsSlice';
import StatementChatIcon from '../StatementChatIcon';
import StatementChatSetOption from '../StatementChatSetOption';
import Text from '../../../../components/text/Text';
import Edit from '../../../../components/edit/Edit';




interface Props {
    statement: Statement;
    showImage: Function;
    top: number;
}



const StatementOptionCard: FC<Props> = ({ statement, top }) => {
    const dispatch = useAppDispatch();
    const evaluation = useAppSelector(evaluationSelector(statement.statementId))
    // const order = useAppSelector(statementOrderSelector(statement.statementId))
    const elementRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false)
    const [newTop, setNewTop] = useState(top);
    
    const { isOption } = statement;

    useEffect(() => {

        setNewTop(top);

    }, [top]);

    useEffect(() => {

        dispatch(setStatementElementHight({ statementId: statement.statementId, height: elementRef.current?.clientHeight }))

    }, [])

    //get element height

    return (
        <>
            <div
                className="options__card"
                style={{ top: `${newTop}px` }}
                ref={elementRef}
            >
                <div className="options__card__main">
                    {isOption ? <Thumbs evaluation={evaluation} upDown='up' statement={statement} /> : null}

                    <div className='options__card__text text' onClick={() => setShow(!show)}>
                        <Text text={statement.statement} />
                    </div>


                    {isOption ? <Thumbs evaluation={evaluation} upDown='down' statement={statement} /> : null}
                </div>
                {true ? <div className="options__card__more">
                    <StatementChatIcon statement={statement} />
                    <Edit statement={statement} />
                    {isOption ? <div className="statement__bubble__proCon">
                        <span>{statement.pro ? statement.pro : 0}</span>
                        <ThumbsUpDownIcon className="icon" />
                        <span>{statement.con ? statement.con : 0}</span>
                    </div> : null}
                    <StatementChatSetOption statement={statement} />
                </div> : null}

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