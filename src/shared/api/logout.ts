import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const logout = () =>
  new HTTPTransport().post(ENDPOINTS.logout);
