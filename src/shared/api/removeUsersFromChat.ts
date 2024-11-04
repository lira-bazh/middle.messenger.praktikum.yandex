import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const removeUsersFromChat = <T = void>(data: RequestData): Promise<T> =>
  new HTTPTransport().delete<T>(ENDPOINTS.usersInChat, { data });
