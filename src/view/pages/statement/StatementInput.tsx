import {FC} from 'react'
import { Statement } from '../../../model/statementModel'
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { auth } from '../../../functions/db/auth';

interface Props{
    statement:Statement
}

const StatementInput:FC<Props> = ({statement}) => {

function handleAddStatement(e:any){
    try {
        e.preventDefault();
        const userId = auth.currentUser?.uid;
        if(!userId) throw new Error('User not logged in');

        const newStatement:Statement = {
            statement:e.target.newStatement.value,
            statementId:crypto.randomUUID(),
            creatorId:userId,
            parentId:statement.statementId,
        }
         
        setStatmentToDB(newStatement);
        e.target.reset();
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className="statementInput">
        <form onSubmit={handleAddStatement}>
        <input type="text" name='newStatement' />
        <button>Submit</button>
        </form>
    </div>
  )
}

export default StatementInput