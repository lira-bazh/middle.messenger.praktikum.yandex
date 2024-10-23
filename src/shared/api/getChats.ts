import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const getChats = <T = void>(): Promise<T> => {
  return new HTTPTransport().get<T>(ENDPOINTS.chats);
};
