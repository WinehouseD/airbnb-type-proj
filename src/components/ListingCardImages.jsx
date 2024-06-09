import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCardImages = ({ listing }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CarouselContent className='ml-0'>
        {listing.images.map((image, index) => (
          <CarouselItem key={image} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-md object-cover'
              src={getImageUrl(image)}
              alt={`${listing.name} Image ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && (
        <>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </>
      )}
    </Carousel>
  );
};

export default ListingCardImages;
