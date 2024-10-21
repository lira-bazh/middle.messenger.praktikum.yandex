import { store } from '@/shared/framework';
import { getChats } from '@/shared/api';
import { IStore } from '@/types';

export const getUserChats = (state: IStore) => {
  if (!state.chats && !state.user) {
    void getChats().then(data => {
      void store.dispatch({
        type: 'GET_CHATS',
        data,
      });
    });
  }
};
