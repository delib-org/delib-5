import { Statement } from 'delib-npm';
import { FC } from 'react';
import { useAppSelector } from '../../../../../functions/hooks/reduxHooks';
import { userSelectedRoomSelector, userSelectedTopicSelector } from '../../../../../model/statements/statementsSlice';
import { auth } from '../../../../../functions/db/auth';
import AdminSeeAllGroups from './admin/AdminSeeAllGroups';
import LoaderGlass from '../../../../components/loaders/LoaderGlass';



interface Props {
  statement: Statement;
}


const RoomQuestions: FC<Props> = ({ statement }) => {

  const userTopic = useAppSelector(userSelectedTopicSelector(statement.statementId));
  const userRoom = useAppSelector(userSelectedRoomSelector(statement.statementId));
  console.log(statement.statementId);
  console.log(auth.currentUser?.uid)
  console.log(userRoom)

  const isAdmin = statement.creatorId === auth.currentUser?.uid;

  try {

    return (
      <>
        <h1>חלוקה לחדרים</h1>
        {userTopic ?
          <div>
            <h1>נושא: {userTopic.statement.statement}</h1>
            <h2>מוזמן לחדר מספר: {userTopic.roomNumber}</h2>
          </div> : null}
          <LoaderGlass />
        {isAdmin ? <AdminSeeAllGroups statement={statement} /> : null}
      </>
    )
  } catch (error: any) {
    return (<div>error: {error.message}</div>)
  }
}

export default RoomQuestions