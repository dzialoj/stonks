import { SubmitHandler, useForm } from 'react-hook-form';
import './sign-in.scss';
import ButtonComponent from '../../components/button/button';

interface SignInComponentFormGroup {
  emailAddress: string;
  password: string;
}

export default function SignInPageComponent(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInComponentFormGroup>();

  const onSubmit: SubmitHandler<SignInComponentFormGroup> = (data) =>
    console.log(data);

  return (
    <div className='sign-in-container'>
      <div className='form-container'>
        <h1>Stonks</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register('emailAddress', {
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email address is invalid format.',
              },
            })}
          />

          {errors.emailAddress && errors.emailAddress.message}

          <input
            type='password'
            {...register('password', {
              required: 'Required',
            })}
          />

          <ButtonComponent type='submit' text='Submit' />
        </form>
      </div>
    </div>
  );
}
