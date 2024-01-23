import { Outlet } from 'react-router-dom';
import Table from './shader/Table';
const Home = () => {
  return (
    <div>

        <Outlet />  
        <br />
        <br />
        <Table />
    </div>
  )
};

export default Home;
