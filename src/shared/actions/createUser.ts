import { signup } from '@/shared/api';
import { changePage } from './';
import { EPages, RequestData } from '@/types';

export const createUser = (data: RequestData) => {
  signup(data)
    .then(() => {
      changePage(EPages.messenger);
    })
    .catch(error => console.error(error));
};
