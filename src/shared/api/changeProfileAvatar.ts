import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changeProfileAvatar = <T = void>(avatar: File): Promise<T> => {
  const sendData = new FormData();
  sendData.append('avatar', avatar);

  // @ts-expect-error не нравится тип data
  return new HTTPTransport().put<T>(ENDPOINTS.changeProfileAvatar, { data: sendData });
};
