import './button.scss';

export interface ButtonComponentProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => any;
}

export default function ButtonComponent({ text, type, disabled, onClick }: ButtonComponentProps): JSX.Element {
  return (
    <button className='btn' type={type ?? 'button'} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
