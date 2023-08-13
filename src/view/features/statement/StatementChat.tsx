import { FC, useState } from 'react'
import { Statement } from '../../../model/statements/statementModel'
import { auth } from '../../../functions/db/auth';
import { setStatementisOption } from '../../../functions/db/statements/setStatments';

//icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


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
  const { isOption } = statement;


  return (
    <>

      <div className={isMe ? `statement__chatCard statement__chatCard--me` : "statement__chatCard statement__chatCard--other"}>
        <div onClick={() => showImage(statement.creator)} className="statement__chatCard__profile" style={userProfile ? { backgroundImage: `url(${userProfile})` } : {}}></div>
        <div className={isOption?"statement__bubble statement__bubble--option":"statement__bubble"}>
          <div className={isMe ? "bubble right" : "bubble left"}>
            <div className="statement__bubble__text">
              {isOption?<ThumbDownOffAltIcon className="icon" />:null}
              <p onClick={() => setShow(!show)}>{statement.statement}</p>
              {isOption?<ThumbUpOffAltIcon className="icon"/>:null}
            </div>
            {show ? <div className="statement__bubble__more">
              <div className="icon" onClick={() => setStatementisOption(statement)}> <LightbulbIcon /></div>
              <div className="icon" onClick={() => setStatementisOption(statement)}> <ChatIcon /></div>
            </div> : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default StatementChat