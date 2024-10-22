import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { RequestData } from '@/types';

export const createChat = (data: RequestData) => new HTTPTransport().post(ENDPOINTS.chats, { data });
