import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { store } from '@/framework';

export const getUser = () => {
  if (!store.getState().user) {
    return new HTTPTransport().get(ENDPOINTS.auth);
  }

  return new Promise(resolve => resolve(undefined));
};