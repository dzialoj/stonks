import './button.scss';

export interface ButtonComponentProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => any;
}

export default function ButtonComponent({
  text,
  type,
  onClick,
}: ButtonComponentProps): JSX.Element {
  return (
    <button className='btn' type={type ?? 'button'} onClick={onClick}>
      {text}
    </button>
  );
}
