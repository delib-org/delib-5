import { FC, useState } from 'react'
import { Statement } from 'delib-npm'
import { auth } from '../../../../../functions/db/auth';
import StatementChatIcon from '../StatementChatIcon';

//icons

import Text from '../../../../components/text/Text';
import StatementChatSetOption from '../StatementChatSetOption';
import ProfileImage from './ProfileImage';





interface Props {
  statement: Statement
  showImage: Function
  page:any
}

const StatementChat: FC<Props> = ({ statement, showImage, page }) => {
  // const evaluation = useAppSelector(evaluationSelector(statement.statementId))


  const [show, setShow] = useState(false)

  const userId = auth.currentUser?.uid;
  const creatorId = statement.creatorId;

  const isMe = userId === creatorId;
  const { isOption } = statement;




  return (
    <>

      <div className={isMe ? `statement__chatCard statement__chatCard--me` : "statement__chatCard statement__chatCard--other"}>
        <div className="statement__chatCard__left">
        
          <ProfileImage statement={statement} showImage={showImage} />
          <StatementChatSetOption statement={statement} />
        </div>
      
        <div className={isOption ? "statement__bubble statement__bubble--option" : "statement__bubble"}>
          <div className={isMe ? "bubble right" : "bubble left"}>
            <div className="statement__bubble__text">
              {/* {isOption ? <Thumbs evaluation={evaluation} upDown='up' statement={statement} /> : null} */}
              <div onClick={() => setShow(!show)}><Text text={statement.statement}/></div>
              {/* {isOption ? <Thumbs evaluation={evaluation} upDown='down' statement={statement} /> : null} */}
            </div>
            <div className="statement__bubble__more">
              
              <StatementChatIcon statement={statement} page={page} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// interface ThumbsProps {
//   evaluation: number
//   upDown: "up" | "down";
//   statement: Statement
// }

// const Thumbs: FC<ThumbsProps> = ({ evaluation, upDown, statement }) => {
//   if (upDown === "up") {
//     if (evaluation > 0) {
//       return (
//         <ThumbUpIcon className="icon" onClick={() => setEvaluation(statement, 0)} />
//       )
//     } else {
//       return <ThumbUpOffAltIcon className="icon" onClick={() => setEvaluation(statement, 1)} />
//     }
//   }
//   else {
//     if (evaluation < 0) {
//       return (<ThumbDownIcon className="icon" onClick={() => setEvaluation(statement, 0)} />)
//     }
//     else {
//       return <ThumbDownOffAltIcon className="icon" onClick={() => setEvaluation(statement, -1)} />
//     }

//   }
// }



export default StatementChat;