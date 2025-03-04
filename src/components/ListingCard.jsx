import { DollarSign, Pin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, CardContent, Separator } from '@/components/ui';

import ListingRatingStars from './ListingRatingStars';
import UserAvatar from './UserAvatar';

const ListingCard = ({ listing }) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[listing.userId];

  return (
    <Link to={`/listings/${listing.id}`}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={listing} />
          <ListingFavoriteButton
            className='absolute right-4 top-4'
            listing={listing}
            aria-label='Favorite'
          />
          <ListingRatingStars
            className='absolute bottom-4 left-4'
            listing={listing}
            aria-label='Rating'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
          {listingUser && (
            <>
              <Separator className='my-2' />
              <UserAvatar user={listingUser} />
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
