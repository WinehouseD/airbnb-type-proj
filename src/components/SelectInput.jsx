import { useController } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

const SelectInput = ({ control, name, options, placeholder, ...rest }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className='flex flex-col gap-2'>
      <Select
        onValueChange={field.onChange}
        value={field.value || ''}
        {...rest}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error?.message && (
        <div className='text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default SelectInput;
