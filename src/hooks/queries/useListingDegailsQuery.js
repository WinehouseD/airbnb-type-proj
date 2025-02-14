import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const useListingDegailsQuery = (listingId) => {
  return useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => api.get(`/api/listings/${listingId}`),
  });
};

export default useListingDegailsQuery;
