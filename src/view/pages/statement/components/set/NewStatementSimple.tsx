import { FC, useState } from 'react';
import { StatementType } from '../../../../../model/statements/statementModel';
import { setStatmentToDB } from '../../../../../functions/db/statements/setStatments';
import Loader from '../../../../components/loaders/Loader';
import {Statement, UserSchema } from 'delib-npm';
import { useAppSelector } from '../../../../../functions/hooks/reduxHooks';
import { userSelector } from '../../../../../model/users/userSlice';

interface Props {
    parentStatement: Statement;
    isOption?: boolean;
    setShowModal: Function;
}


const NewSetStatementSimple: FC<Props> = ({ parentStatement, isOption,setShowModal }) => {

 const user = useAppSelector(userSelector);

    const [isLoading, setIsLoading] = useState(false);



    async function handleAddStatment(ev: React.FormEvent<HTMLFormElement>) {
        try {

            ev.preventDefault();
            setIsLoading(true);
            const data = new FormData(ev.currentTarget);

            let title: any = data.get('statement');
            const description = data.get('description');
            //add to title * at the beggining
            if (title && !title.startsWith('*')) title = `*${title}`;
            const _statement = `${title}\n${description}`;
            const _user = user;
            if (!_user) throw new Error("user not found");
            const { displayName, email, photoURL, uid } = _user;
            const userObj = { displayName, email, photoURL, uid };
            UserSchema.parse(userObj);


            const newStatement: any = Object.fromEntries(data.entries());



            newStatement.statement = _statement;
            newStatement.statementId = crypto.randomUUID();
            newStatement.creatorId = userObj.uid;
            newStatement.parentId = parentStatement.statementId;
            newStatement.type = StatementType.GROUP;
            newStatement.creator =  user;
            if(isOption) newStatement.isOption = true;

            newStatement.lastUpdate = new Date().getTime();

            newStatement.createdAt = new Date().getTime();

            newStatement.consensus = 0;

            const setSubsciption: boolean = true;

            await setStatmentToDB(newStatement, setSubsciption);

            setIsLoading(false);

            setShowModal(false)


        } catch (error) {
            console.error(error);
        }
    }




    return (
       <>

            {!isLoading ? <form onSubmit={handleAddStatment} className='setStatement__form'>
               <h2>הוספת אפשרות</h2>
                <input type="text" name="statement" placeholder='כותרת' />
                <textarea name="description" placeholder='תיאור'></textarea>


                <div className="btnBox">
                    <button type="submit">הוספה</button>
                    <button className='btn btn--cancel'>ביטול</button>
                </div>

            </form> :
                <div className="center">
                    <h2>מעדכן...</h2>
                    <Loader />
                </div>}
       </>

    );
};

export default NewSetStatementSimple;

// function isSubPageChecked(statement: Statement | undefined, screen: Screen) {
//     try {
//         if (!statement) return true;
//         const subScreens = statement.subScreens as Screen[];
//         if (subScreens === undefined) return true;
//         if (subScreens?.includes(screen)) return true;
//     } catch (error) {
//         console.error(error);
//         return true;
//     }
// }

// function parseScreensCheckBoxes(dataObj: Object, navArray: NavObject[]) {
//     try {
//         if (!dataObj) throw new Error("dataObj is undefined");
//         if (!navArray) throw new Error("navArray is undefined");
//         const _navArray = [...navArray];

//         const screens = _navArray
//             //@ts-ignore
//             .filter(navObj => dataObj[navObj.link] === "on")
//             .map(navObj => navObj.link);
//         return screens;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }
