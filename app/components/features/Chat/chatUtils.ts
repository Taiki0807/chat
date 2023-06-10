interface Member {
  id: number;
  username: string;
  password: string;
  image: string | null;
}

interface Data {
  member: Member[];
  roomId: string;
  type: string;
  name: string | null;
}

const getChatMessageClassName = (
  userID: number | undefined,
  messageUserId: number
) => {
  return userID === messageUserId
    ? 'message__right'
    : 'message__left';
};

const formatDate = (
  isoString: string,
  format = 'M/D hh:mm'
) => {
  const date = new Date(isoString);
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0');
  return format
    .replace('M', month)
    .replace('D', day)
    .replace('hh', hours)
    .replace('mm', minutes);
};

const getChatRoomName = (
  data: Data,
  user: number | undefined
) => {
  const { member, name } = data;
  if (!member) {
    return '';
  }

  if (!name) {
    for (let i = 0; i < member.length; i++) {
      if (member[i].id !== user) {
        return member[i].username;
      }
    }
  }

  return name;
};

export {
  getChatMessageClassName,
  formatDate,
  getChatRoomName,
};
