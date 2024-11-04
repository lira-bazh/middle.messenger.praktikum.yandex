import { store } from '@/shared/framework';
import { addUsersToChat } from '@/shared/api';
import { changePage, updateUsersByChat } from '@/shared/actions';
import { EPages } from '@/types';

export const addUserToChat = (user: number): void => {
  const state = store.getState();
  if (state.selectedChat) {
    const data = { users: [user], chatId: state.selectedChat.id };

    addUsersToChat(data)
      .then(() => {
        updateUsersByChat();
        changePage(EPages.messenger);
      })
      .catch(error => console.error(error));
  }

};
