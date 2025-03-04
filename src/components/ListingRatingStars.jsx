import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const ListingRatingStars = ({ className, listing }) => {
  return (
    <div
      className={cn(
        'inline-flex flex-row items-center rounded-md bg-background px-2 py-1',
        className,
      )}
    >
      <Star className='size-4 fill-star text-star' />
      <span className='ml-2'>{listing.rating}</span>
    </div>
  );
};

export default ListingRatingStars;
