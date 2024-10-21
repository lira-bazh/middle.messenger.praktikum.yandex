import { store } from '@/shared/framework';
import { authUser } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages, IStore } from '@/types';

export const getUser = (state: IStore = store.getState()) => {
  if (!state.user) {
    void authUser()
      .then(data => {
        void store.dispatch({
          type: 'GET_USER',
          data,
        });

        if (
          window.location.pathname === (EPages.default as string) ||
          window.location.pathname === (EPages.registration as string)
        ) {
          changePage(EPages.messenger);
        }
      })
      .catch(() => {
        changePage(EPages.default);
      });
  }
};
