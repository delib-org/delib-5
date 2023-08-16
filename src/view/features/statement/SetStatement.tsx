import React from 'react'
import { StatementType } from '../../../model/statements/statementModel';
import { setStatmentToDB } from '../../../functions/db/statements/setStatments';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../../functions/db/auth';
import { UserSchema } from '../../../model/users/userModel';

//icons
import ArrowBackIosIcon from '../../icons/ArrowBackIosIcon';

const SetStatement = () => {
    const navigate = useNavigate();
    const { statementId } = useParams();
    async function handleSetStatment(ev: React.FormEvent<HTMLFormElement>) {
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

            const _statementId = await setStatmentToDB(newStatement);

            if (_statementId)
                navigate(`/home/statement/${_statementId}`);
            else
                throw new Error("statement not found");
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='page setStatement'>
            <div className="page__header setStatement__header">
                <span></span>
                <h1>הוספת קבוצה חדשה</h1>
                <Link to={"/home"} className='setStatement__back'> <ArrowBackIosIcon /></Link>
            </div>
            <div className="page__main">

                <form onSubmit={handleSetStatment} className='setStatement__form'>
                    <input type="text" name="statement" placeholder='כותרת הקבוצה' />
                    <div className="btnBox">
                        <button type="submit">הוספה</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetStatement