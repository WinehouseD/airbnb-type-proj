import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const ReviewCardStars = ({ className, review }) => {
  return (
    <div className={cn('inline-flex flex-row items-center', className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn('size-5 fill-secondary text-secondary', {
            'fill-star text-star ': i < review.rating,
          })}
        />
      ))}
    </div>
  );
};

export default ReviewCardStars;
