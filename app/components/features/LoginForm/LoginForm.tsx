'use client';
import { useAuthContext } from './AuthContext';
import style from './LoginForm.module.css';
import { Button } from '@/app/components/parts/Button';
import { Input } from '@/app/components/parts/Input';

export const LoginForm = (): JSX.Element => {
  const { loginUser } = useAuthContext();
  return (
    <div className={style.center}>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <Input type={'text'} name={'username'}>
          Username
        </Input>
        <Input type={'password'} name={'password'}>
          password
        </Input>
        <Button color={'blue'}>Login</Button>
      </form>
    </div>
  );
};
