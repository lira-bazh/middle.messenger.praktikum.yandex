import { store } from '@/shared/framework';
import { getUsersByChat } from '@/shared/api';
import { IUser } from '@/types';

export const updateUsersByChat = () => {
  const state = store.getState();
  if (state.selectedChat) {
    getUsersByChat<IUser[]>(state.selectedChat.id)
      .then(data => {
        store.dispatch({
          type: 'UPDATE_USERS_BY_CHAT',
          data,
        });
      })
      .catch(error => console.error(error));
  }
};
