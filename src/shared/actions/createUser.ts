import { signup } from '@/shared/api';
import { changePage } from './';
import { EPages } from '@/types';

export const createUser = (data: Record<string, string | number | object | unknown[]>) => {
  void signup(data).then(() => {
    changePage(EPages.messenger);
  });
};
