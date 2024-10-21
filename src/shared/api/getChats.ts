import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const getChats = () => {
  return new HTTPTransport().get(ENDPOINTS.chats);
};
