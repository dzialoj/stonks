import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/button/button';
import FormErrorComponent from '../../components/form-error/form-error';
import SocialMediaLogin from '../../components/social-media-login/social-media-login';
import './sign-in.scss';

interface ISignInComponentFormGroup {
  emailAddress: string;
  password: string;
}

export default function SignInPageComponent(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<ISignInComponentFormGroup>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignInComponentFormGroup> = (data: ISignInComponentFormGroup) => {
    console.log(data);
    navigate('/home');
  };

  return (
    <div className='sign-in-container'>
      <div className='form-container'>
        <h1>Stonks</h1>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Email Address'
            {...register('emailAddress', {
              required: 'Email address is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email address is invalid format.',
              },
            })}
          />

          {errors.emailAddress && <FormErrorComponent text={errors.emailAddress.message} />}

          <input
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Required',
            })}
          />

          <div className='divider'>
            <div className='line'></div>
            <p>or</p>
            <div className='line'></div>
          </div>

          <SocialMediaLogin />

          <div className='submit'>
            <ButtonComponent type='submit' text='Submit' disabled={!isValid} />
          </div>
        </form>
      </div>
    </div>
  );
}
