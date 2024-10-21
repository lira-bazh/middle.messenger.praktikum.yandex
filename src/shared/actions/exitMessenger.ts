import { store } from '@/shared/framework';
import { logout } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const exitMessenger = () => {
  void logout().then(() => {
    changePage(EPages.default);
    store.dispatch({
      type: 'CLEAR_STORE',
    });
  });
};
