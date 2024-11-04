import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const createChat = <T = void>(data: RequestData): Promise<T> => new HTTPTransport().post<T>(ENDPOINTS.chats, { data });
