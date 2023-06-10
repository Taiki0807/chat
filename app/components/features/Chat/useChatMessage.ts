import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

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

export const useChatMessage = (id: string) => {
  const { data } = useSWR<ChatMessageList>(
    `/api/v1/chats/${id}/messages?limit=20&offset=0`,
    getFetcher
  );
  return {
    Data: data,
  };
};
