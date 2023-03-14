'use client';
import { useEffect, useState } from 'react';
import {
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import style from './Toast.module.css';

interface Props {
  outHideDuration: number;
  message: string;
  onClose?: () => void;
}

export const Toast = (props: Props): JSX.Element => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (props.onClose) props.onClose();
    }, props.outHideDuration);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClose = () => {
    setVisible(false);
    if (props.onClose) props.onClose();
  };
  return visible ? (
    <div className={style.toast}>
      <div className={style.toast_content}>
        <i className={style.icon}>
          <AiOutlineCheck size={'20'} color={'#fff'} />
        </i>
        <div className={style.message}>
          <span className={style.text1}>Success</span>
          <span className={style.text2}>
            {props.message}
          </span>
        </div>
        <i
          className={style.close_button}
          onClick={handleClose}
        >
          <AiOutlineClose size={'20'} color={'#fff'} />
        </i>
      </div>
      <div className={style.progress}></div>
    </div>
  ) : (
    <></>
  );
};
