import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useListingsQuery = (filters) => {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => api.get(`/api/listings`, filters),
  });
};

export default useListingsQuery;
