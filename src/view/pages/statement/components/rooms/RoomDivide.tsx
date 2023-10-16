import { Statement } from 'delib-npm';
import { FC } from 'react';
import {  useAppSelector } from '../../../../../functions/hooks/reduxHooks';
import {  userSelectedTopicSelector } from '../../../../../model/statements/statementsSlice';
import { auth } from '../../../../../functions/db/auth';
import AdminSeeAllGroups from './admin/AdminSeeAllGroups';



interface Props {
  statement: Statement;
}


const RoomQuestions: FC<Props> = ({ statement }) => {

  const userTopic = useAppSelector(userSelectedTopicSelector(statement.statementId));


  const isAdmin = statement.creatorId === auth.currentUser?.uid;

  try {

    



    return (
      <>
        <h1>חלוקה לחדרים</h1>
        {userTopic ? <h1>נושא: {userTopic.statement.statement}</h1> : null}
       {isAdmin?<AdminSeeAllGroups statement={statement} />:null} 
      </>
    )
  } catch (error: any) {
    return (<div>error: {error.message}</div>)
  }
}

export default RoomQuestions