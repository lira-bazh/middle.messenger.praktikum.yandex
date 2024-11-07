import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changeProfileAvatar = <T = void>(avatar: File): Promise<T> => {
  const sendData = new FormData();
  sendData.append('avatar', avatar);

  return new HTTPTransport().put<T>(ENDPOINTS.changeProfileAvatar, { file: sendData });
};
