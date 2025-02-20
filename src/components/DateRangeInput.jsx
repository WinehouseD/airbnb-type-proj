import { useController } from 'react-hook-form';

import { DateRangePicker } from '@/components/ui/DateRangePicker';

const DateRangeInput = ({
  control,
  name,
  placeholder = 'Select date range',
  minDate,
  maxDate,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className='flex flex-col gap-2'>
      <DateRangePicker
        value={field.value}
        onChange={field.onChange}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
      />
      {error?.message && (
        <div className='text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default DateRangeInput;
