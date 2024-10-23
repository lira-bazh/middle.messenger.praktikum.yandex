import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const getTokenForWS = <T = void>(id: number): Promise<T> => {
  return new HTTPTransport().post<T>(ENDPOINTS.chatToken(id));
};
