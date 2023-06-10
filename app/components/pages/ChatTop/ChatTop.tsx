import { ChatList } from '../../features';
import { ChatHeader } from '../../features/Chat/components';
import { ChatInput } from '../../parts';
import style from './ChatTop.module.css';

export const ChatTop = (): JSX.Element => {
  return (
    <div className={style.chat__top}>
      <div className={style.chat__side}>
        <ChatList />
      </div>
      <div className={style.chat__main}>
        <ChatHeader chatName="Chat" />
        <div className={style.message}>
          <p>メッセージを選択</p>
        </div>
        <div className={style.chat__input}>
          <ChatInput text={'Send a message...'} />
        </div>
      </div>
    </div>
  );
};
