import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { store } from '@/shared/framework';

export const authUser = () => {
  if (!store.getState().user) {
    return new HTTPTransport().get(ENDPOINTS.auth);
  }

  return new Promise(resolve => resolve(undefined));
};