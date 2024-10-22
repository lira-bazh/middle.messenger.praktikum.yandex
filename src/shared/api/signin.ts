import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const signin = (data: RequestData) => new HTTPTransport().post(ENDPOINTS.signin, { data });
