import IconButtonComponent from '../icon-button/icon-button';
import './social-media-login.scss';

export default function SocialMediaLogin(): JSX.Element {
  return (
    <div className='icon-wrapper'>
      <IconButtonComponent iconName='fa-brands fa-google' />
      <IconButtonComponent iconName='fa-brands fa-twitter' />
      <IconButtonComponent iconName='fa-brands fa-facebook' />
    </div>
  );
}
