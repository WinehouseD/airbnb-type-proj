import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import DateRangeInput from '@/components/DateRangeInput';
import Form from '@/components/Form';
import ImagesInput from '@/components/ImagesInput';
import SelectInput from '@/components/SelectInput';
import StepperInput from '@/components/StepperInput';
import TextInput from '@/components/TextInput';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import useCreateListingMutation from '@/hooks/mutations/useCreateListingMutation';

const createListingFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  locationId: z.coerce.number(),
  images: z.array(z.string()).min(1),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a whole number' })
    .min(1),
  maxGuests: z.number().min(1),
  availability: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const CreateListingForm = () => {
  const navigate = useNavigate();

  const createListingMutation = useCreateListingMutation();

  const form = useForm({
    resolver: zodResolver(createListingFormSchema),
    defaultValues: {
      maxGuests: 1,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createListingMutation.mutateAsync(data);

      navigate(`/listings/${response.data.id}`);
    } catch (e) {
      form.setError('root', {
        message: e.response.data.message,
      });
    }
  };

  const locationOptions = [
    { value: '1', label: 'London' },
    { value: '2', label: 'Paris' },
  ];

  return (
    <Card className='mx-auto w-[800px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Create Listing</h2>
        <p className='text-center text-muted-foreground'>
          Create a new listing
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <TextInput
            control={form.control}
            name='name'
            placeholder='Listing Name'
          />
          <TextInput
            control={form.control}
            multiline='true'
            name='description'
            placeholder='Description'
          />
          <SelectInput
            control={form.control}
            name='locationId'
            options={locationOptions}
            placeholder='Select a location'
          />
          <ImagesInput control={form.control} name='images' />
          <TextInput
            control={form.control}
            name='price'
            placeholder='Price per night'
          />
          <StepperInput control={form.control} name='maxGuests' label='guest' />
          <DateRangeInput
            control={form.control}
            name='availability'
            placeholder='Select availability'
            minDate={new Date()}
          />
          <Button
            disabled={createListingMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createListingMutation.isPending ? 'Loading...' : 'Create Listing'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateListingForm;
