import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const signin = <T = void>(data: RequestData): Promise<T> => new HTTPTransport().post<T>(ENDPOINTS.signin, { data });
