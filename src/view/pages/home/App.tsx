
import { Outlet } from 'react-router-dom';



function App() {
  // const navigate = useNavigate();


  // const isLogged = useAuth();
  // useEffect(() => {
  //   setTimeout(() => {
  //     // if(!isLogged) navigate('/');
  //   }, 500);

  // }, [isLogged])
  return (
    <div className="page">
      <Outlet />
    </div>
  )
}

export default App
