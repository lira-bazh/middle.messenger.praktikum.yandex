import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const changeProfile = <T = void>(data: RequestData): Promise<T> => {
  return new HTTPTransport().put<T>(ENDPOINTS.changeProfile, { data });
};
