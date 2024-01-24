import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-2 max-w-5xl mx-auto text-black fill-gray-400">

      <Outlet />  
      <h1>
        te
      </h1>
    </div>
  )
};

export default Home;
