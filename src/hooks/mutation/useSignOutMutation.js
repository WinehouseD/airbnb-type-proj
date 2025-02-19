import { useMutation } from '@tanstack/react-query';

import api from '@/api';

const useSignOutMutation = () => {
  return useMutation({
    mutationFn: () => api.post('/api/signout'),
  });
};

export default useSignOutMutation;
