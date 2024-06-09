import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';

const Navbar = () => {
  const { setToken } = useAuth();

  const handleSignOut = async () => {
    try {
      await api.post('/api/signout');
    } catch {
      setToken(null);
    }
  };

  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorites</Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link>Account</Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
