import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

export const GetRoom = (id: number) => {
  const url = `/api/v1/users/${id}/chats`;
  const data = useSWR(url, getFetcher);

  return {
    Data: data,
  };
};
