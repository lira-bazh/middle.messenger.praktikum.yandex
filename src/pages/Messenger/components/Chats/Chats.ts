import { Block, store } from '@/framework';
import { ChatItem } from './components';
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

    void store.dispatch({
      type: 'GET_CHATS',
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
