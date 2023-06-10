'use client';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

interface ChatMemberType {
  chatMember: any[];
  setChatMember: React.Dispatch<
    React.SetStateAction<any[]>
  >;
}

const initialChatMemberState: ChatMemberType = {
  chatMember: [],
  setChatMember: () => {},
};

export const ChatMemberContext =
  createContext<ChatMemberType>(initialChatMemberState);

export function useChatMember() {
  return useContext(ChatMemberContext);
}

export function ChatMemberProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [chatMember, setChatMember] = useState<any[]>([]);

  return (
    <ChatMemberContext.Provider
      value={{ chatMember, setChatMember }}
    >
      {children}
    </ChatMemberContext.Provider>
  );
}
