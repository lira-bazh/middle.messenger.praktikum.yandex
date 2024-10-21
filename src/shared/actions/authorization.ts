import { signin } from '@/shared/api';
import { changePage, getUser } from './';
import { EPages } from '@/types';

const ATREADY_IN_SYSTEM = 'User already in system';

export const authorization = (data: Record<string, string | number | object | unknown[]>): void => {
  void signin(data)
    .then(() => {
      getUser();
      changePage(EPages.messenger);
    })
    .catch(error => {
      try {
        const message = JSON.parse(error.message).reason;
        if (message === ATREADY_IN_SYSTEM) {
          changePage(EPages.messenger);
        }
      } catch {
        changePage(EPages.registration);
      }
    });
};
