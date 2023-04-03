import './icon-button.scss';

export interface IconButtonComponentProps {
  iconName: string;
  onClick: () => void;
}

export default function IconButtonComponent({ iconName, onClick }: IconButtonComponentProps): JSX.Element {
  return (
    <button className='icon-button' onClick={onClick}>
      <i className={iconName}></i>
    </button>
  );
}
