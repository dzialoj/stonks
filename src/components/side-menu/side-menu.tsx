import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButtonComponent from '../icon-button/icon-button';
import './side-menu.scss';

export interface SideMenuComponentProps {}

interface IMenuItem {
  route: string;
  icon: string;
  label: string;
}

export default function SideMenu({}: SideMenuComponentProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const menuItems: IMenuItem[] = [
    {
      route: 'home',
      icon: 'fa-chart-line',
      label: 'Dashboard',
    },
    {
      route: 'search',
      icon: 'fa-magnifying-glass',
      label: 'Search',
    },
  ];

  return (
    <div className={`side-menu-wrapper ${open && 'side-menu-wrapper-open'}`}>
      <IconButtonComponent onClick={() => setOpen((prev) => !prev)} iconName={'fa-solid fa-bars'} />
      {menuItems.map((x, i) => (
        <div className='item' key={i}>
          <IconButtonComponent onClick={() => navigate(x.route)} iconName={`fa-solid ${x.icon}`} />
          {open ? <span>{x.label}</span> : null}
        </div>
      ))}
    </div>
  );
}
