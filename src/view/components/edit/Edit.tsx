import { FC } from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Statement } from 'delib-npm';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../functions/db/auth';

interface Props {
    statement: Statement
}

const Edit: FC<Props> = ({ statement }) => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    function handleEdit() {
        try {
            navigate(`/home/updateStatement/${statement.statementId}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            {user?.uid === statement.creatorId ?
                <div className='clickable' onClick={handleEdit}><ModeEditOutlineOutlinedIcon htmlColor='#444'/></div>
                : <div />}
        </>
    )
}

export default Edit