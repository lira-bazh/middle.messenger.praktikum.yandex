import { Block, store } from '@/shared/framework';
import { ChatItem } from './components';
import { getChats } from '@/shared/api';
import { IChat } from '@/types';

export class Chats extends Block {
  constructor() {
    super({
      ChatList: [],
    });

    store.subscribe(state => {
      this.lists.ChatList = this.getChatList(state.chats ?? []);
      this.setProps({ chats: state.chats ?? [] });
    });

    void getChats()
      .then(data => {
        void store.dispatch({
          type: 'GET_CHATS',
          data,
        });
      });
  }

  getChatList(chats: IChat[]): Block[] {
    return chats.map(chat => new ChatItem({ chat, onClick: () => void store.dispatch({ type: 'SELECT_CHAT', chat }) }));
  }

  override render(): string {
    return `
      <div class="chats">
        {{{ ChatList }}}
      </div>
    `;
  }
}
