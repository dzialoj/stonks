export interface IFormErrorComponentProps {
  text: string;
}

export default function FormErrorComponent({ text }: IFormErrorComponentProps) {
  return <div style={{ color: 'red', alignSelf: 'flex-start' }}>{text}</div>;
}
