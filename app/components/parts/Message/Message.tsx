import { Icon } from '../Icon';
import style from './Message.module.css';

interface Props {
  img: string;
  message: string;
  name: string;
  styles: string;
  timestamp: string;
}

export const Message = (props: Props): JSX.Element => {
  const IconClass =
    props.styles === 'message__right' ? 'icon__none' : '';
  const TimeRight =
    props.styles === 'message__right'
      ? 'time__right'
      : 'time__left';
  return (
    <div
      className={`${style.message} ${style[props.styles]}`}
    >
      <div className={style[IconClass]}>
        <Icon
          img={props.img}
          width={45}
          height={45}
          online={false}
          alt={'icon'}
        />
      </div>
      <div className={style.message_item}>
        <p className={style.chat__text}>{props.message}</p>
        <span
          className={`${style.chat__time} ${style[TimeRight]}`}
        >
          {props.timestamp}
        </span>
      </div>
    </div>
  );
};
