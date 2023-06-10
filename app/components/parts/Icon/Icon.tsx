import Image from 'next/image';
import style from './Icon.module.css';

interface Props {
  img: string;
  alt: string;
  online: boolean;
  width: number;
  height: number;
}

export const Icon = (props: Props): JSX.Element => {
  return (
    <div className={style.icon__container}>
      <Image
        src={props.img}
        alt={props.alt}
        width={props.width}
        height={props.height}
        className={style.icon}
      />
      {props.online ? (
        <div className={style.mark}></div>
      ) : (
        ''
      )}
    </div>
  );
};
