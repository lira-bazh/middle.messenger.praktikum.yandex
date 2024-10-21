import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const getTokenForWS = (id: string) => {
  return new HTTPTransport().post(ENDPOINTS.chatToken(id));
};
