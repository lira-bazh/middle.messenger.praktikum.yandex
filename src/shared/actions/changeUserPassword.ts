import { changePassword } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages, RequestData } from '@/types';

export const changeUserPassword = (data: RequestData) => {
  changePassword(data)
    .then(() => {
      changePage(EPages.messenger);
    })
    .catch(error => console.error(error));
};
