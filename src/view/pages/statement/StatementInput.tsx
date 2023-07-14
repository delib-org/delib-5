import { FC } from 'react'
import { Statement, StatementType } from '../../../model/statements/statementModel'
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { auth } from '../../../functions/db/auth';
import SendIcon from '@mui/icons-material/Send';
import { getUserFromFirebase } from '../../../functions/db/users/usersGeneral';

interface Props {
    statement: Statement
}

const StatementInput: FC<Props> = ({ statement }) => {

    function handleAddStatement(e: any) {
        try {
            e.preventDefault();
            const value = e.target.newStatement.value;

            const newStatement: Statement|undefined = getNewStatment(value, statement);
            if(!newStatement) throw new Error('No statement');
            setStatmentToDB(newStatement);
            e.target.reset();
        } catch (error) {
            console.error(error);
        }



        
    }

    function handleAddStatementA(event: any) {
        console.log(event)
    }

    function handleInput(e: any) {
        try {
            console.dir(e)

            if (e.key === 'Enter' && !e.shiftKey) {
                // submit form
                const newStatement: Statement|undefined = getNewStatment(e.target.value, statement);
                if(!newStatement) throw new Error('No statement');
                setStatmentToDB(newStatement);
                e.target.value = '';
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <form onSubmit={handleAddStatement} name="theForm" className="page__footer statement__input">
            <textarea name='newStatement' onKeyUp={handleInput} />
            <button className="fav" onClick={handleAddStatementA}><div><SendIcon>Submit</SendIcon></div></button>
        </form>

    )
}

function getNewStatment(value?: string, statement?: Statement) {
         
    try {
        if(!statement) throw new Error('No statement');
        if (!value) throw new Error('No value');
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error('User not logged in');

        const creator = getUserFromFirebase();
        if (!creator) throw new Error('User not logged in');

        const newStatement: Statement = {
            statement: value,
            statementId: crypto.randomUUID(),
            creatorId: userId,
            creator,
            parentId: statement.statementId,
            type: StatementType.STATEMENT,
        };
        return newStatement;
    } catch (error) {
        console.error(error);
        return undefined
    }
}

export default StatementInput