import { useState } from 'react';
import { useController } from 'react-hook-form';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ImagesInput = ({ control, name }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (image) => {
    const currentImages = field.value || [];

    const updatedImages = currentImages.includes(image)
      ? currentImages.filter((img) => img !== image)
      : [...currentImages, image];

    setSelectedImages(updatedImages);
    field.onChange(updatedImages);
  };

  const imageOptions = [
    'listing1-1.jpg',
    'listing1-2.jpg',
    'listing1-3.jpg',
    'listing1-4.jpg',
    'listing1-5.jpg',
    'listing1-6.jpg',
    'listing1-7.jpg',
  ];

  return (
    <div className='flex flex-col gap-2'>
      <Carousel className='mx-auto w-[90%]'>
        <CarouselContent>
          {imageOptions.map((image) => (
            <CarouselItem
              key={image}
              className='basis-1/3'
              isSelected={selectedImages.includes(image)}
              onClick={() => handleImageSelect(image)}
            >
              <img
                className='h-[200px] w-full cursor-pointer rounded-md object-cover'
                src={getImageUrl(image)}
                alt={`Listing Image Option ${image}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {error?.message && (
        <div className='text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default ImagesInput;
