import { useNavigate } from 'react-router-dom';
import Fav from '../../components/fav/Fav';
import { useQueryClient,useQuery } from 'react-query';
import { getStatmentsSubsciptions } from '../../../functions/db/statements/getStatement';
import { StatementSubscription } from '../../../model/statementModel';



const Main = () => {
    const navigate = useNavigate();

      // Access the client
  const queryClient = useQueryClient()
  const {data, error, isLoading} = useQuery('subs', getStatmentsSubsciptions)
  console.log(data)
  console.log(error)

    function handleAddStatment() {
        navigate('/home/addStatment')
    }
    return (
        <div>
            <h1>Main</h1>
            <Fav onclick={handleAddStatment} />
            {isLoading? <p>Loading...</p>
            :
            data?.map((item:StatementSubscription) => <p key={item.statementsSubscribeId}>{item.statementId}</p>)}
        </div>
    )
}

export default Main