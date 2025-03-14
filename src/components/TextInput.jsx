import { useController } from 'react-hook-form';
import { Input } from './ui';

const TextInput = ({ control, name, type = 'text', ...rest }) => {
  const form = useController({ control, name });

  const error = form.formState.errors[name];

  return (
    <div>
      <Input
        {...rest}
        type={type}
        name={name}
        onChange={form.field.onChange}
        onBlur={form.field.onBlur}
        value={form.field.value || ''}
      />
      {error && (
        <div className='mt-2 text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default TextInput;
