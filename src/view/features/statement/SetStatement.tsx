import React from 'react'
import { StatementSchema } from '../../../model/statementModel';
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { Link, useParams } from 'react-router-dom';
import { auth } from '../../../functions/db/auth';

const SetStatement = () => {
    const {statementId} = useParams();
    function handleSetStatment(ev: React.FormEvent<HTMLFormElement>) {
        try {
            
            ev.preventDefault();
            const data = new FormData(ev.currentTarget);
           
            const newStatement:any = Object.fromEntries(data.entries());
            newStatement.statementId = crypto.randomUUID();
            newStatement.creatorId = auth.currentUser?.uid;
            newStatement.parentId = statementId ||"top";
           
            StatementSchema.parse(newStatement)

            setStatmentToDB(newStatement);
            ev.currentTarget.reset();
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <Link to={"/home"}> <button>Back</button></Link>
            <form onSubmit={handleSetStatment}>
                <input type="text" name="statement" placeholder='title' />
                <input type="submit" value="ADD" />
            </form>
        </div>
    )
}

export default SetStatement