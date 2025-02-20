import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/api';

const useCreateListingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post('/api/listings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listings'],
      });
    },
  });
};

export default useCreateListingMutation;
