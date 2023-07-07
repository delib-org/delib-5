import { useNavigate } from 'react-router-dom';
import Fav from '../../components/fav/Fav'

const Main = () => {
    const navigate = useNavigate();

    function handleAddStatment(){
        navigate('/home/addStatment')
    }
    return (
        <div>
            <h1>Main</h1>
            <Fav onclick={handleAddStatment}/>
        </div>
    )
}

export default Main