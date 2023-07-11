import { FC } from 'react'
import { Statement } from '../../../model/statementModel'
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { auth } from '../../../functions/db/auth';
import SendIcon from '@mui/icons-material/Send';

interface Props {
    statement: Statement
}

const StatementInput: FC<Props> = ({ statement }) => {

    function handleAddStatement(e: any) {
        try {
            e.preventDefault();
            const userId = auth.currentUser?.uid;
            if (!userId) throw new Error('User not logged in');

            const newStatement: Statement = {
                statement: e.target.newStatement.value,
                statementId: crypto.randomUUID(),
                creatorId: userId,
                parentId: statement.statementId,
            }

            setStatmentToDB(newStatement);
            e.target.reset();
        } catch (error) {
            console.error(error);
        }

       
    }

    function handleAddStatementA(event: any) {
        console.log(event)
    }

    return (

        <form onSubmit={handleAddStatement} className="page__footer statement__input">
            <textarea name='newStatement' />
            <button className="fav" onClick={handleAddStatementA}><div><SendIcon>Submit</SendIcon></div></button>
        </form>

    )
}

export default StatementInput