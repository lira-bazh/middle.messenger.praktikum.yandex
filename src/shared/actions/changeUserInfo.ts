import { store } from '@/shared/framework';
import { changeProfile } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const changeUserInfo = (data: Record<string, string | number | object | unknown[]>) => {
  void changeProfile(data).then(result => {
    store.dispatch({
      type: 'CHANGE_PROFILE',
      data: result,
    });
    changePage(EPages.messenger);
  });
};
