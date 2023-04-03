import { Outlet } from 'react-router';
import SideMenu from '../../components/side-menu/side-menu';
import './home.scss';

export default function Home(): JSX.Element {
  return (
    <div className='home-wrapper'>
      <SideMenu />
      <Outlet />
    </div>
  );
}
