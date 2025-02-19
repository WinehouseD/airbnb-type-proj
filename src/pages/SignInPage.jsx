import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate('/', { replace: true });
    }
  }, [navigate, token, user]);

  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
