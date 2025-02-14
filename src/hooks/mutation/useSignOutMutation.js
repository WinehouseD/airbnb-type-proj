import api from '@/api';
import { useMutation } from '@tanstack/react-query';

const useSignOutMutation = () => {
  return useMutation({
    mutationFn: api.post(`/api/signout`),
  });
};

export default useSignOutMutation;
