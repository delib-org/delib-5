import React from 'react'
import { StatementSchema, StatementType } from '../../../model/statements/statementModel';
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { Link, useParams } from 'react-router-dom';
import { auth } from '../../../functions/db/auth';
import { UserSchema } from '../../../model/users/userModel';

const SetStatement = () => {
    const { statementId } = useParams();
    function handleSetStatment(ev: React.FormEvent<HTMLFormElement>) {
        try {

            ev.preventDefault();
            const data = new FormData(ev.currentTarget);
            const _user = auth.currentUser;
            if (!_user) throw new Error("user not found");
            const { displayName, email, photoURL, uid } = _user;
            const user = { displayName, email, photoURL, uid };
            UserSchema.parse(user);

           
            const newStatement: any = Object.fromEntries(data.entries());
            newStatement.statementId = crypto.randomUUID();
            newStatement.creatorId = auth.currentUser?.uid;
            newStatement.parentId = statementId || "top";
            newStatement.type = StatementType.GROUP;
            newStatement.creator = user;
            newStatement.createdAt = new Date().getTime();
            newStatement.consensus = 0;

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