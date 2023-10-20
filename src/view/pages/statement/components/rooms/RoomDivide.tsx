import { Statement } from 'delib-npm';
import { FC } from 'react';
import { useAppSelector } from '../../../../../functions/hooks/reduxHooks';
import { userSelectedRoomSelector, userSelectedTopicSelector } from '../../../../../model/statements/statementsSlice';
import { auth } from '../../../../../functions/db/auth';
import AdminSeeAllGroups from './admin/AdminSeeAllGroups';
import LoaderGlass from '../../../../components/loaders/LoaderGlass';
import styles from './roomDivide.module.scss';



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
        {userTopic && userTopic.approved ?
          <div className={styles.message}>
            <h2>נושא דיון: {userTopic.statement.statement}</h2>
            <div className={styles.text}>מוזמן/ת לחדר מספר <span>{userTopic.roomNumber}</span> בזום</div>
          </div>
          :
          <div className={styles.container} style={{flexDirection:"column"}}>
            <h2>אנא המתינו לחלוקה לחדרים...</h2>
            <LoaderGlass />
          </div>
        }

        {isAdmin ? <AdminSeeAllGroups statement={statement} /> : null}
      </>
    )
  } catch (error: any) {
    return (<div>error: {error.message}</div>)
  }
}

export default RoomQuestions