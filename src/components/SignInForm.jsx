import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '@/components/AuthProvider';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import TextInput from './TextInput';
import Form from './Form';
import useSignInMutation from '@/hooks/mutation/useSignInMutation';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken } = useAuth();

  const form = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const signInMutation = useSignInMutation();

  const onSubmit = async (data) => {
    try {
      const response = await signInMutation.mutateAsync(data);
      setToken(response.data.accessToken);
    } catch (e) {
      form.setError('root', {
        message: e.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <TextInput
            control={form.control}
            name='email'
            placeholder='name@example.com'
          />
          <TextInput control={form.control} name='password' type='password' />

          <Button
            disabled={signInMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
            className='mt-6'
          >
            {form.formState.isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
