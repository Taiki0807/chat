import Image from 'next/image';
import style from './Icon.module.css';

interface Props {
  img: string;
  alt: string;
}

export const Icon = (props: Props): JSX.Element => {
  return (
    <div className={style.icon__container}>
      <Image
        src={props.img}
        alt={props.alt}
        width={60}
        height={60}
        className={style.icon}
      />
      <div className={style.mark}></div>
    </div>
  );
};
