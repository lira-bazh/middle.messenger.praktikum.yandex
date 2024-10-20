import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { store } from '@/framework';

export const removeSelectedChat = () => {
  const state = store.getState();

  if (state.selectedChat) {
    const chatId = state.selectedChat.id;
    return new HTTPTransport().delete(ENDPOINTS.chats, { data: { chatId } });
  }

  return new Promise(resolve => resolve(undefined));
};
