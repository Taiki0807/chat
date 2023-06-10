import useSWR from 'swr';
import { getFetcher } from '@/utils/httpClient';

interface User {
  id: number;
  username: string;
  password: string;
  image: string | null;
}

interface UseGetUsersReturn {
  Users: User[];
}

export const useGetUsers = (): UseGetUsersReturn => {
  const url = `/api/v1/users`;
  const { data } = useSWR<User[]>(url, getFetcher);

  return {
    Users: data || [],
  };
};
