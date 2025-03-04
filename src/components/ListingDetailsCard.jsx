import { DollarSign, Pin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, Separator } from '@/components/ui';

import ListingRatingStars from './ListingRatingStars';
import UserAvatar from './UserAvatar';

const ListingDetailsCard = ({ listing }) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[listing.userId];

  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
          <div className='flex items-center'>
            <DollarSign className='mr-2 size-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='size-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='size-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </div>
        <div>
          <ListingRatingStars
            className='mr-2 bg-transparent p-0'
            listing={listing}
          />
          <ListingFavoriteButton listing={listing} aria-label='Favorite' />
        </div>
      </div>
      <Separator className='my-4' />
      {listingUser && (
        <>
          <UserAvatar user={listingUser} />
          <Separator className='my-2' />
        </>
      )}
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
