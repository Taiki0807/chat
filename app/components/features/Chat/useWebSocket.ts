import {
  useEffect,
  useState,
  useRef,
  Dispatch,
} from 'react';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';

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

interface Props {
  userID: number | undefined;
  chatID: string;
  setOnlineUserList: Dispatch<
    React.SetStateAction<never[]>
  >;
  setMessages: Dispatch<
    React.SetStateAction<ChatMessageList>
  >;
}

export const useChatWebSocket = ({
  userID,
  chatID,
  setOnlineUserList,
  setMessages,
}: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<WebSocket>();
  const { user } = useAuthContext();
  let typingTimer: NodeJS.Timeout;
  let isTypingSignalSent = false;

  const SocketActions = {
    MESSAGE: 'message',
    TYPING: 'typing',
    ONLINE_USER: 'onlineUser',
  };

  useEffect(() => {
    if (!userID) {
      return;
    }

    const websocket = new WebSocket(
      `ws://chat-api-taiki0807.fly.dev/ws/users/${userID}/chat/`
    );
    socketRef.current = websocket;
  }, [userID]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const userId = user?.id;
        if (chatID === data.roomId) {
          if (data.action === SocketActions.MESSAGE) {
            setMessages((prevState) => {
              let messagesState = JSON.parse(
                JSON.stringify(prevState)
              );
              messagesState.results.unshift(data);
              return messagesState;
            });
            setIsTyping(false);
          } else if (
            data.action === SocketActions.TYPING &&
            data.user !== userId
          ) {
            setIsTyping(data.typing);
          }
        }
        if (data.action === SocketActions.ONLINE_USER) {
          setOnlineUserList(data.userList);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatID, user]);

  const sendMessage = (message: string) => {
    if (message && socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          action: SocketActions.MESSAGE,
          message: message,
          user: user?.id,
          roomId: chatID,
        })
      );
    }
  };

  const sendTypingSignal = (typing: boolean) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          action: SocketActions.TYPING,
          typing: typing,
          user: user?.id,
          roomId: chatID,
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

  return {
    isTyping,
    sendMessage,
    chatMessageTypingHandler,
  };
};
