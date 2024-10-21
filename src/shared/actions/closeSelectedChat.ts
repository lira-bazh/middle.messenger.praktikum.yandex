import { store } from '@/shared/framework';

export const closeSelectedChat = () => {
  store.dispatch({ type: 'CLOSE_SELECTED_CHAT' });
};
