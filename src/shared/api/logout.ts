import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';

export const logout = <T = void>(): Promise<T> => new HTTPTransport().post<T>(ENDPOINTS.logout);
