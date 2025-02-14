import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useListingDegailsQuery from '@/hooks/queries/useListingDegailsQuery';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: { data: listing } = {},
    isLoading,
    error,
  } = useListingDegailsQuery(listingId);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
