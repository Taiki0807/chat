'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  getFetcher,
  postFetcher,
} from '@/utils/httpClient';

interface Author {
  id: number;
  username: string;
}
interface AuthContextProps {
  user: Author | undefined;
  setUser: Dispatch<SetStateAction<Author | undefined>>;
  /* eslint-disable no-unused-vars */
  loginUser: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}

interface AuthProps {
  children: ReactNode;
}
interface Status {
  status: number;
}
interface Refresh {
  refresh: string;
}

const AuthContext = createContext<
  Partial<AuthContextProps>
>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<Author | undefined>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const isAvailableForViewing =
    pathname === '/' || pathname === '/signup';
  const loginUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await postFetcher('/api/auth/login/', {
      username: e.currentTarget.username?.value,
      password: e.currentTarget.password?.value,
    });
    if (res.success === 1) {
      getUser();
    }
  };
  const getUser = async () => {
    const response: Author = await getFetcher(
      '/api/auth/get/'
    );
    if (response.username !== null) {
      setUser(response);
    }
  };
  const getStatus = async () => {
    try {
      const response: Status = await getFetcher(
        '/api/auth/status/'
      );
      setStatus(response.status);
      if (response.status === 1) {
        getUser();
      }
      if (response.status === 1 && isAvailableForViewing) {
        router.push('/chat');
      }
    } catch (error) {
      updateToken();
    }
  };

  const updateToken = async () => {
    try {
      const response: Refresh = await getFetcher(
        '/api/auth/refresh-token/'
      );
      const refresh = response.refresh;
      if (refresh !== null) {
        await postFetcher('/api/auth/refresh/', {
          refresh: refresh,
        });
      }
      getStatus();
      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      await router.push('/');
    }
  };
  const values: AuthContextProps = {
    user,
    setUser,
    loginUser,
  };
  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fourMinutes = 1000 * 4 * 60;
    const interval = setInterval(() => {
      if (loading) {
        updateToken();
      }
    }, fourMinutes);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
