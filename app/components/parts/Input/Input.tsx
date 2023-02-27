import style from './Input.module.css';

interface Props {
  type?: 'text' | 'password';
  children: React.ReactNode;
  name: string;
}

export const Input = (props: Props): JSX.Element => {
  return (
    <div className={style.text_filed}>
      <input
        type={props.type}
        name={props.name}
        required
      ></input>
      <span></span>
      <label>{props.children}</label>
    </div>
  );
};
