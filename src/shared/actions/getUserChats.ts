import { store } from '@/shared/framework';
import { getChats } from '@/shared/api';
import { IStore, IChat } from '@/types';

export const getUserChats = (state: IStore) => {
  if (!state.chats && !state.user) {
    getChats<IChat[]>()
      .then(data => {
        store.dispatch({
          type: 'GET_CHATS',
          data,
        });
      })
      .catch(error => console.error(error));
  }
};
