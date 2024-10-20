import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const changeProfile = (data: Record<string, string | number | object | unknown[]>) => {
  return new HTTPTransport().put(ENDPOINTS.changeProfile, { data });
};
