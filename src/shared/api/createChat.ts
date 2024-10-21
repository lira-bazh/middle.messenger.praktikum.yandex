import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const createChat = (data: Record<string, string | number | object | unknown[]>) =>
  new HTTPTransport().post(ENDPOINTS.chats, { data });
