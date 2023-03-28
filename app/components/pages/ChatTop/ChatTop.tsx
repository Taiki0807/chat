import { Chat, ChatList } from '../../features';
import style from './ChatTop.module.css';

interface Props {
  id: string;
}
export const ChatTop = (props: Props): JSX.Element => {
  return (
    <div className={style.chattop}>
      <div className={style.chat__side}>
        <ChatList />
      </div>
      <div className={style.chat__main}>
        <Chat id={props.id} />
      </div>
    </div>
  );
};
