import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const signup = (data: RequestData) => new HTTPTransport().post(ENDPOINTS.signup, { data });
