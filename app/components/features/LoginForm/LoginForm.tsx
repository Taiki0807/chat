'use client';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthContext';
import style from './LoginForm.module.css';
import { Toast } from '@/app/components/features/Toast';
import { Button } from '@/app/components/parts/Button';
import { Input } from '@/app/components/parts/Input';

export const LoginForm = (): JSX.Element => {
  const { loginUser, user } = useAuthContext();
  const router = useRouter();
  const handleClose = () => {
    router.push('/chat');
  };

  return (
    <div>
      {user && (
        <Toast
          outHideDuration={3000}
          message={`${user}さん認証に成功しました。`}
          onClose={handleClose}
        />
      )}
      <div className={style.center}>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <Input
            type={'text'}
            name={'username'}
            testid={'username'}
          >
            Username
          </Input>
          <Input
            type={'password'}
            name={'password'}
            testid={'password'}
          >
            password
          </Input>
          <Button color={'blue'}>Login</Button>
        </form>
      </div>
    </div>
  );
};
