import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changeProfileAvatar = (avatar: File) => {
  const sendData = new FormData();
  sendData.append('avatar', avatar);

  // @ts-expect-error не нравится тип data
  return new HTTPTransport().put(ENDPOINTS.changeProfileAvatar, { data: sendData });
};
