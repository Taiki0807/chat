'use client';
import { useState, useEffect, useRef } from 'react';
import style from './Chat.module.css';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';
import { getFetcher } from '@/utils/httpClient';

interface Props {
  id: string;
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
  results: ChatMessage[];
};

export const Chat = (props: Props): JSX.Element => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageList>(
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }
  );
  const [typing, setTyping] = useState(false);
  const { user } = useAuthContext();
  let typingTimer: NodeJS.Timeout;
  let isTypingSignalSent = false;
  const socketRef = useRef<WebSocket>();
  const [userID, setUserID] = useState<number | undefined>(
    0
  );
  const SocketActions = {
    MESSAGE: 'message',
    TYPING: 'typing',
    ONLINE_USER: 'onlineUser',
  };

  const fetchChatMessage = async () => {
    if (props.id) {
      const url =
        `/api/v1/chats/${props.id}/messages` +
        '?limit=20&offset=0';
      const chatMessages: ChatMessageList =
        await getFetcher(url);
      setMessages(chatMessages);
    }
  };
  useEffect(() => {
    fetchChatMessage();
    setUserID(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
  useEffect(() => {
    if (!userID) {
      return;
    }

    const websocket = new WebSocket(
      `ws://localhost:8000/ws/users/${userID}/chat/`
    );
    socketRef.current = websocket;
  }, [userID]);
  if (socketRef.current) {
    socketRef.current.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      const chatId = props.id;
      const userId = user?.id;
      if (chatId === data.roomId) {
        if (data.action === SocketActions.MESSAGE) {
          setMessages((prevState) => {
            let messagesState = JSON.parse(
              JSON.stringify(prevState)
            );
            messagesState.results.unshift(data);
            return messagesState;
          });
          setTyping(false);
        } else if (
          data.action === SocketActions.TYPING &&
          data.user !== userId
        ) {
          setTyping(data.typing);
        }
      }
      if (data.action === SocketActions.ONLINE_USER) {
        //setOnlineUserList(data.userList);
      }
    };
  }
  const messageSubmitHandler = (event: any) => {
    event.preventDefault();
    if (inputMessage && socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          action: SocketActions.MESSAGE,
          message: inputMessage,
          user: user?.id,
          roomId: props.id,
        })
      );
    }
    setInputMessage('');
  };
  const sendTypingSignal = (typing: any) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          action: SocketActions.TYPING,
          typing: typing,
          user: user?.id,
          roomId: props.id,
        })
      );
    }
  };

  const chatMessageTypingHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const inputValue = event.currentTarget.value;
    if (inputValue !== '') {
      if (!isTypingSignalSent) {
        sendTypingSignal(true);
        isTypingSignalSent = true;
      }
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        sendTypingSignal(false);
        isTypingSignalSent = false;
      }, 3000);
    } else {
      clearTimeout(typingTimer);
      isTypingSignalSent = false;
    }
  };

  return (
    <div className={style.chat}>
      <div className={style.chat__header}>
        <h1>Chat Test User Id:{user?.id}</h1>
        <pre>{props.id}</pre>
      </div>
      <div className={style.chat__messages}>
        {messages.results.map((message, index) => (
          <div key={index} className={style.chat__message}>
            {message.message}
          </div>
        ))}
        <p>{typing ? 'Typing...' : ''}</p>
      </div>
      <div className={style.chat__input}>
        <form onSubmit={messageSubmitHandler}>
          <input
            onChange={(event) =>
              setInputMessage(event.target.value)
            }
            onKeyUp={chatMessageTypingHandler}
            value={inputMessage}
            id="chat-message-input"
            type="text"
            className="form-control"
            placeholder="Type your message"
            autoComplete="off"
          ></input>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
