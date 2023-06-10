'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';
import {
  Button,
  Icon,
  Modal,
  Popover,
  RadioButton,
} from '../../parts';
import { getChatRoomName } from '../Chat/chatUtils';
import { useChatMember } from './ChanelListContext';
import style from './ChatList.module.css';
import { GetRoom } from './GetRoom';
import { useGetUsers } from './useGetUsers';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';
import {
  getFetcher,
  postFetcher,
} from '@/utils/httpClient';

export const ChatList = () => {
  const { user, setUser } = useAuthContext();
  const { Data } = GetRoom(user?.id ?? 2);
  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { Users } = useGetUsers();
  const [selected, setSelected] = useState('');
  const router = useRouter();
  const { setChatMember } = useChatMember();

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  const handleClick_modal = () => {
    setModal(true);
  };
  const handleClose_modal = () => {
    setModal(false);
  };
  const changeValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setSelected(event.target.value);
  const handleLogout = async () => {
    await getFetcher('/api/auth/logout');
    setUser && setUser(undefined);
    router.push('/');
  };
  const addMemberHandler = async () => {
    const userId = user?.id;
    await postFetcher('/api/v1/chats', {
      members: [selected, userId],
      type: 'DM',
    });
    setModal(false);
  };
  if (!Users) return <div>loading...</div>;
  if (!Array.isArray(Users)) return <div>loading...</div>;
  if (!Data.data) return <div>loading...</div>;
  if (!Array.isArray(Data.data))
    return <div>loading...</div>;
  setChatMember(Data.data);
  return (
    <div className={style.chatlist__container}>
      <Modal open={modal} onClose={handleClose_modal}>
        <h1>Add Chat</h1>
        <div className={style.modal__item}>
          {Users.map((data: any, index: number) => {
            return (
              <RadioButton
                value={data.id}
                name={'users'}
                onChange={changeValue}
                key={index}
              >
                {data.username}
              </RadioButton>
            );
          })}
        </div>
        <Button color="purple" onClick={addMemberHandler}>
          追加
        </Button>
      </Modal>
      <div className={style.side__header}>
        <p>{user?.username}</p>
        <div>
          <button
            className={style.button}
            onClick={handleClick}
          >
            <FaChevronDown color={'white'} />
          </button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <button
              onClick={handleClick_modal}
              className={style.popover__item}
            >
              <MdPersonAddAlt1 size={30} />
              Add Chat
            </button>
            <Button color="purple" onClick={handleLogout}>
              Log Out
            </Button>
          </Popover>
        </div>
      </div>
      <div>
        {Data.data.map((data: any, index: number) => {
          return (
            <Link
              href={`/chat/room/${data.roomId}`}
              key={index}
              className={style.link}
            >
              <div className={style.chatlist}>
                <Icon
                  img={
                    data.image
                      ? data.image
                      : 'https://picsum.photos/seed/picsum/200/300'
                  }
                  alt="icon"
                  height={60}
                  width={60}
                  online={false}
                ></Icon>
                <h4 className={style.name}>
                  {getChatRoomName(data, user?.id)}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
