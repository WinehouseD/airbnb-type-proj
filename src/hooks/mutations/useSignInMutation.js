import { useMutation } from '@tanstack/react-query';

import api from '@/api';

const useSignInMutation = () => {
  return useMutation({
    mutationFn: (data) => api.post('/api/signin', data),
  });
};

export default useSignInMutation;
