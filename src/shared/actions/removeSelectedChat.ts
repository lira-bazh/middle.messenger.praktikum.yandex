import { store } from '@/shared/framework';
import { removeChat } from '@/shared/api';

export const removeSelectedChat = () => {
  void removeChat().then(() => {
    store.dispatch({ type: 'REMOVE_SELECTED_CHAT' });
  });
}