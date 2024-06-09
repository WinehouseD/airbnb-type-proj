import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <div className='items-center'>
        {token && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default App;
