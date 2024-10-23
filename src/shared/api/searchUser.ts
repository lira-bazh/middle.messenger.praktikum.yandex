import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const searchUser = <T = void>(data: RequestData): Promise<T> =>
  new HTTPTransport().post<T>(ENDPOINTS.searchUser, { data });
