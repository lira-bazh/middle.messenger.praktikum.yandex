import { store } from '@/shared/framework';
import { changeProfile } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages, RequestData } from '@/types';

export const changeUserInfo = (data: RequestData) => {
  changeProfile(data)
    .then(result => {
      store.dispatch({
        type: 'CHANGE_PROFILE',
        data: result,
      });
      changePage(EPages.messenger);
    })
    .catch(error => console.error(error));
};
