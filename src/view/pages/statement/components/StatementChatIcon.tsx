import { FC } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { setStatmentGroupToDB } from '../../../../functions/db/statements/setStatments';
import { Statement, StatementSubscription, StatementType } from 'delib-npm';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../functions/hooks/reduxHooks';
import { statementSubscriptionSelector } from '../../../../model/statements/statementsSlice';

interface Props {
    statement: Statement
}

const StatementChatIcon: FC<Props> = ({ statement }) => {
    const statementSubscription:StatementSubscription|undefined = useAppSelector(statementSubscriptionSelector(statement.statementId))
    let   messagesRead = 0;
    if(statementSubscription) messagesRead = statementSubscription.totalSubStatementsRead ||0;
    const messages = statement.totalSubStatements || 0;
 
    const navigate = useNavigate();
    return (
        <div className="more" onClick={() => handleCreateSubStatements(statement, navigate)}>
            <div className="icon">
                {statement.type === StatementType.GROUP && (messages - messagesRead)>0 ? <div className="redCircle">
                    {messages - messagesRead<10?messages - messagesRead:`9+`}
                </div> : null}
                <ChatIcon htmlColor={statement.totalSubStatements && statement.totalSubStatements >0?"blue":'lightgray'} />
            </div>
            <div className='text'>{statement.lastMessage}</div>
        </div>
    )
}

export default StatementChatIcon;

export function handleCreateSubStatements(statement: Statement, navigate: Function) {
    setStatmentGroupToDB(statement);


    navigate(`/home/statement/${statement.statementId}`)
    //if no kids change it to group type GROUP

}