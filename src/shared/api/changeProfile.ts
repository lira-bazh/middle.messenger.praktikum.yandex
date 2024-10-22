import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const changeProfile = (data: RequestData) => {
  return new HTTPTransport().put(ENDPOINTS.changeProfile, { data });
};
