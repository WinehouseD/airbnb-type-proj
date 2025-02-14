import { Link } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';
import useSignOutMutation from '@/hooks/mutation/useSignOutMutation';

const Navbar = () => {
  const { setToken } = useAuth();

  const signOutMutation = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      await signOutMutation.mutateAsync();

      setToken(null);
    } catch {
      setToken(null);
    }
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <div className='flex-end flex flex-row items-center gap-8'>
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
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
