import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changeChatAvatar = <T = void>(chatId: number, avatar: File): Promise<T> => {
  const sendData = new FormData();
  sendData.append('chatId', String(chatId));
  sendData.append('avatar', avatar);

  return new HTTPTransport().put<T>(ENDPOINTS.chatAvatar, { file: sendData });
};
