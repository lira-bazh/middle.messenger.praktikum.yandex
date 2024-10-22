import { store } from '@/shared/framework';
import { removeChat } from '@/shared/api';

export const removeSelectedChat = () => {
  removeChat()
    .then(() => {
      store.dispatch({ type: 'REMOVE_SELECTED_CHAT' });
    })
    .catch(error => console.error(error));
};
