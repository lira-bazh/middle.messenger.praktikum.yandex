import { store } from '@/shared/framework';
import { authUser } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const getUser = () => {
  void authUser()
    .then(data => {
      void store.dispatch({
        type: 'GET_USER',
        data,
      });
    })
    .catch(() => {
      changePage(EPages.default);
    });
};