'use client';
import { FaPaperPlane } from 'react-icons/fa';
import style from './ChatInput.module.css';

interface Props {
  text: string;
  // The 'event' argument is not used in this function but is required for the event handler signature.
  onChange?: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onKeyUp?: (
    // eslint-disable-next-line no-unused-vars
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  value?: string;
}

export const ChatInput = (props: Props): JSX.Element => {
  const handleChange = props.onChange ?? (() => {});
  const handleKeyUp = props.onKeyUp ?? (() => {});
  const value = props.value ?? '';
  return (
    <div className={style.input__wrapper}>
      <input
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        value={value}
        type="text"
        className={style.chat__input}
        placeholder={props.text}
        autoComplete="off"
      />
      <div className={style.chat__inputIcon}>
        <button type="submit">
          <FaPaperPlane color="white" size={'1.3rem'} />
        </button>
      </div>
    </div>
  );
};
