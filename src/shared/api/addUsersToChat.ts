import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const addUsersToChat = <T = void>(data: RequestData): Promise<T> =>
  new HTTPTransport().put<T>(ENDPOINTS.usersInChat, { data });
