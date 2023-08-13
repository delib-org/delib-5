import { FC, useState } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth';

//icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface Props {
  statement: Statement
  showImage: Function
}

const StatementChat: FC<Props> = ({ statement, showImage }) => {

  const [show, setShow] = useState(false)

  const userId = auth.currentUser?.uid;
  const userProfile = statement.creator.photoURL;
  const creatorId = statement.creatorId;

  const isMe = userId === creatorId;



  return (
    <>

      <div className={isMe ? `statement__chatCard statement__chatCard--me` : "statement__chatCard statement__chatCard--other"}>
        <div onClick={() => showImage(statement.creator)} className="statement__chatCard__profile" style={userProfile ? { backgroundImage: `url(${userProfile})` } : {}}></div>
        <div className={isMe ? "statement__bubble bubble right" : "statement__bubble bubble left"}>
          <div className="statement__bubble__text" onClick={() => setShow(!show)}>
            {statement.statement}
          </div>
          {show ? <div className="statement__bubble__more">
           <div className="icon"> <LightbulbIcon /></div>
          </div> : null}
        </div>
      </div>
    </>
  )
}

export default StatementChat