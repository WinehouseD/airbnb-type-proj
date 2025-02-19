import { useQuery } from '@tanstack/react-query';

import api from '@/api';

const useListingsQuery = (filters) => {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => api.get('/api/listings', { params: filters }),
  });
};

export default useListingsQuery;
