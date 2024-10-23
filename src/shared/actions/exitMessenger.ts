import { store } from '@/shared/framework';
import { logout } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const exitMessenger = () => {
  logout()
    .then(() => {
      changePage(EPages.default);
      store.dispatch({
        type: 'CLEAR_STORE',
      });
    })
    .catch(error => console.error(error));
};
