import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';
import useListingsQuery from '@/hooks/queries/useListingsQuery';

const ListingFavoritesPage = () => {
  const { favoriteListingIds } = useSelector((state) => state.listings);

  const {
    data: { data: listings } = {},
    error,
    isLoading,
  } = useListingsQuery();

  const favoriteListings = useMemo(() => {
    if (!listings) {
      return [];
    }

    return listings.filter((listing) =>
      favoriteListingIds.includes(listing.id),
    );
  }, [listings, favoriteListingIds]);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingList listings={favoriteListings} />
      </DataRenderer>
    </div>
  );
};

export default ListingFavoritesPage;
