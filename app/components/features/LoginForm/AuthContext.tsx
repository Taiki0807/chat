'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';
import {
  getFetcher,
  postFetcher,
} from '@/utils/httpClient';

export interface AuthContextProps {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  loginUser: () => Promise<void>;
}

export interface AuthProps {
  children: ReactNode;
}

interface Author {
  username: string;
}

const AuthContext = createContext<
  Partial<AuthContextProps>
>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState('');
  const loginUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await postFetcher('/api/auth/login/', {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    });
    if (res.success === 1) {
      const response: Author = await getFetcher(
        '/api/auth/get/'
      );
      if (response.username !== null) {
        setUser(response.username);
      }
    }
  };
  const values = {
    user,
    setUser,
    loginUser,
  };

  return (
    <AuthContext.Provider
      value={values as AuthContextProps}
    >
      {children}
    </AuthContext.Provider>
  );
};
