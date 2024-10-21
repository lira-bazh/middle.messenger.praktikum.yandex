import { HTTPTransport } from '@/shared/helpers/request';
import { ENDPOINTS } from '@/constants';
import { store } from '@/shared/framework';

export const removeChat = () => {
  const state = store.getState();

  if (state.selectedChat) {
    const chatId = state.selectedChat.id;
    return new HTTPTransport().delete(ENDPOINTS.chats, { data: { chatId } });
  }

  return new Promise(resolve => resolve(undefined));
};
