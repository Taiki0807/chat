'use client';
import { useState } from 'react';
import { Chat, ChatList } from '../../features';
import style from './ChatDetail.module.css';

interface Props {
  id: string;
}
export const ChatDetail = (props: Props): JSX.Element => {
  const [onlineUserList, setOnlineUserList] = useState([]);
  return (
    <div className={style.chattop}>
      <div className={style.chat__side}>
        <ChatList />
      </div>
      <div className={style.chat__main}>
        <Chat
          id={props.id}
          onlineUserList={onlineUserList}
          setOnlineUserList={setOnlineUserList}
        />
      </div>
    </div>
  );
};
