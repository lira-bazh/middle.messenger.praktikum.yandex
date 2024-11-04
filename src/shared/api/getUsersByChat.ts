import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const getUsersByChat = <T = void>(id: number): Promise<T> => {
  return new HTTPTransport().get<T>(ENDPOINTS.getUsersByChat(id));
};
