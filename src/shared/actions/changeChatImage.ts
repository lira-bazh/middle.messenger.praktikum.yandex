import { store } from '@/shared/framework';
import { changeChatAvatar } from '@/shared/api';

export const changeChatImage = (avatar: File) => {
  const state = store.getState();

  if (state.selectedChat) {
    changeChatAvatar(state.selectedChat.id, avatar)
      .then(data => store.dispatch({ type: 'UPDATE_CHAT_AVATAR', data }))
      .catch(error => console.error(error));
  }
};
