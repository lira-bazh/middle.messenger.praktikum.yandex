import { store } from '@/shared/framework';
import { addUsersToChat } from '@/shared/api';
import { changePage } from '@/shared/actions';
import { EPages } from '@/types';

export const addUserToChat = (user: number) => {
  const state = store.getState();
  if (state.selectedChat) {
    const data = { users: [user], chatId: state.selectedChat.id };

    void addUsersToChat(data).then(result => {
      console.log('result', result);
      changePage(EPages.messenger);
    });
  }

};
