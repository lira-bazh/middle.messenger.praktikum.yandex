import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changePassword = (data: Record<string, string | number | object | unknown[]>) =>
  new HTTPTransport().put(ENDPOINTS.changePassword, { data });
