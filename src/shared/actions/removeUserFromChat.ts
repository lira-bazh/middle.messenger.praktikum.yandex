import { store } from '@/shared/framework';
import { removeUsersFromChat } from '@/shared/api';
import { updateUsersByChat } from './';

export const removeUserFromChat = (id: number) => {
  const state = store.getState();
  if (state.selectedChat) {
    removeUsersFromChat({ users: [id], chatId: state.selectedChat.id })
      .then(() => {
        updateUsersByChat();
      })
      .catch(error => console.error(error));
  }
};
