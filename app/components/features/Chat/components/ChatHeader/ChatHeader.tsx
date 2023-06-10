import style from './ChatHeader.module.css';

interface Props {
  chatName: string;
  children?: React.ReactNode;
}

export const ChatHeader = (props: Props): JSX.Element => {
  return (
    <div className={style.chat__header}>
      <h1>{props.chatName}</h1>
      <div>{props.children}</div>
    </div>
  );
};
