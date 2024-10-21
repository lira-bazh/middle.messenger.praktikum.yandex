import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const signin = (data: Record<string, string | number | object | unknown[]>) =>
  new HTTPTransport().post(ENDPOINTS.signin, { data });
