import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const addUsersToChat = (data: Record<string, string | number | object | unknown[]>) =>
  new HTTPTransport().put(ENDPOINTS.addUsersToChat, { data });
