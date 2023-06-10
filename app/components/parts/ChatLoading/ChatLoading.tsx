import style from './ChatLoading.module.css';

export const ChatLoading = (): JSX.Element => {
  return (
    <div className={style.loader__container}>
      <div className={style.dot__loader}></div>
      <div className={style.dot__loader}></div>
      <div className={style.dot__loader}></div>
    </div>
  );
};
