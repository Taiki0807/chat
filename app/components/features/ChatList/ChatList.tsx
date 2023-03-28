import { Icon } from '../../parts';
import style from './ChatList.module.css';

export const ChatList = (): JSX.Element => {
  return (
    <div className={style.chatlist}>
      <Icon
        img="https://picsum.photos/seed/picsum/200/300"
        alt="icon"
      ></Icon>
      <p className={style.name}>name</p>
    </div>
  );
};
