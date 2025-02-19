import { useQuery } from '@tanstack/react-query';

import api from '@/api';

const useListingDetailsQuery = (listingId) => {
  return useQuery({
    queryKey: ['listingDetails', listingId],
    queryFn: () => api.get(`/api/listings/${listingId}`),
  });
};

export default useListingDetailsQuery;
