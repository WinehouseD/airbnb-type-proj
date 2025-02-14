import api from '@/api';
import { useMutation } from '@tanstack/react-query';

const useSignInMutation = () => {
  return useMutation({
    mutationFn: (data) => api.post(`/api/signin`, data),
  });
};

export default useSignInMutation;
