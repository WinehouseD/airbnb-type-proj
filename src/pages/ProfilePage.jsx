import { useMemo } from 'react';

import { useAuth } from '@/components/AuthProvider';
import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';
import { Card, CardContent } from '@/components/ui';
import UserAvatar from '@/components/UserAvatar';
import useListingsQuery from '@/hooks/queries/useListingsQuery';

const ProfilePage = () => {
  const { user } = useAuth();

  const {
    data: { data: listings } = {},
    error,
    isLoading,
  } = useListingsQuery();

  const userListings = useMemo(() => {
    if (!listings) {
      return [];
    }

    return listings.filter((listing) => listing.userId === user.id);
  }, [listings, user.id]);

  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <div className='container py-4'>
      <div className='mb-4 flex flex-col items-center'>
        <UserAvatar className='mb-4 size-[200px]' imageOnly user={user} />
        <h1 className='text-center'>{displayName}</h1>
      </div>
      <Card className='mb-8 pt-4'>
        <CardContent>
          <div className='whitespace-pre-line'>{user.bio}</div>
        </CardContent>
      </Card>
      <div>
        <h2 className='mb-4'>Your Listings</h2>
        <DataRenderer error={error} isLoading={isLoading}>
          <ListingList listings={userListings} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default ProfilePage;
