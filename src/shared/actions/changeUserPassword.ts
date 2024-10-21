import { changePassword } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const changeUserPassword = (data: Record<string, string | number | object | unknown[]>) => {
  void changePassword(data).then(() => {
    changePage(EPages.messenger);
  });
};
