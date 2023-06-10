'use client';
import { useState, Dispatch, useEffect } from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import {
  ChatInput,
  ChatLoading,
  Icon,
  Message,
  Popover,
} from '../../parts';
import { useChatMember } from '../ChatList/ChanelListContext';
import style from './Chat.module.css';
import {
  getChatMessageClassName,
  formatDate,
} from './chatUtils';
import { ChatHeader } from './components';
import { useChatMessage } from './useChatMessage';
import { useChatWebSocket } from './useWebSocket';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';

interface Props {
  id: string;
  onlineUserList: string[];
  setOnlineUserList: Dispatch<
    React.SetStateAction<never[]>
  >;
}

interface ChatMessage {
  userName: string;
  userImage: string | null;
  message: string;
  timestamp: string;
  user: number;
}
type ChatMessageList = {
  count: number;
  next: string | null;
  previous: string | null;
  chatRoomName: string;
  results: ChatMessage[];
};

export const Chat = (props: Props): JSX.Element => {
  const [inputMessage, setInputMessage] = useState('');
  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<ChatMessageList>(
    {
      count: 0,
      next: null,
      previous: null,
      chatRoomName: '',
      results: [],
    }
  );
  const { chatMember } = useChatMember();

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputMessage(e.target.value);
  };
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const {
    isTyping,
    sendMessage,
    chatMessageTypingHandler,
  } = useChatWebSocket({
    userID: user?.id,
    chatID: props.id,
    setOnlineUserList: props.setOnlineUserList,
    setMessages: setMessages,
  });
  const { Data } = useChatMessage(props.id);
  useEffect(() => {
    if (Data) {
      setMessages(Data);
    }
  }, [Data]);
  if (!Data) return <div>Loading...</div>;

  return (
    <div className={style.chat}>
      <ChatHeader chatName={Data.chatRoomName}>
        <div className={style.popover__wrapper}>
          <button
            className={style.button}
            onClick={handleClick}
          >
            <MdPeopleAlt size={30} />
          </button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <h4>Chat Member</h4>
            {chatMember.map((data: any) => {
              if (data.roomId === props.id) {
                return (
                  <div key={data.roomId}>
                    {data.member.map((member: any) => (
                      <div
                        key={member.id}
                        className={style.userlist}
                      >
                        <Icon
                          img="https://picsum.photos/seed/picsum/200/300"
                          alt="icon"
                          height={40}
                          width={40}
                          online={props.onlineUserList.some(
                            (id) => id === member.id
                          )}
                        ></Icon>
                        <h4 className={style.name}>
                          {member.username}
                        </h4>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </Popover>
        </div>
      </ChatHeader>
      <div className={style.chat__messages}>
        {isTyping ? <ChatLoading /> : ''}
        {messages.results.map(
          (message: any, index: number) => (
            <div key={index}>
              <Message
                img={
                  message.userImage
                    ? message.userImage
                    : 'https://picsum.photos/seed/picsum/200/300'
                }
                message={message.message}
                name={message.userName}
                styles={getChatMessageClassName(
                  user?.id,
                  message.user
                )}
                timestamp={formatDate(message.timestamp)}
              />
            </div>
          )
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <ChatInput
          text={'Send a message...'}
          onChange={handleChange}
          value={inputMessage}
          onKeyUp={(e) => chatMessageTypingHandler(e)}
        />
      </form>
    </div>
  );
};
