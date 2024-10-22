import { store } from '@/shared/framework';
import { getChats } from '@/shared/api';
import { IStore } from '@/types';

export const getUserChats = (state: IStore) => {
  if (!state.chats && !state.user) {
    getChats()
      .then(data => {
        store.dispatch({
          type: 'GET_CHATS',
          data,
        });
      })
      .catch(error => console.error(error));
  }
};
