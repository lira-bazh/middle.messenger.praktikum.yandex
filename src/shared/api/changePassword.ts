import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const changePassword = (data: RequestData) => new HTTPTransport().put(ENDPOINTS.changePassword, { data });
