import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const searchUser = (data: RequestData) => new HTTPTransport().post(ENDPOINTS.searchUser, { data });
