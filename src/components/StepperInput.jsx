import { useController } from 'react-hook-form';

import { Stepper } from '@/components/ui/Stepper';

function StepperInput({ control, name, label, ...rest }) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className='flex flex-col gap-2'>
      <Stepper
        label={label}
        value={field.value || 0}
        onChange={field.onChange}
        {...rest}
      />
      {error?.message && (
        <div className='text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
}

export default StepperInput;
