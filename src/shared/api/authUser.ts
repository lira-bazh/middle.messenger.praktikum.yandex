import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { store } from '@/shared/framework';

export const authUser = <T = void>(): Promise<T | undefined> => {
  if (!store.getState().user) {
    return new HTTPTransport().get<T>(ENDPOINTS.auth);
  }

  return new Promise(resolve => resolve(undefined));
};
