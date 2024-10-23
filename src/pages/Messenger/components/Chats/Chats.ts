import { Block, store } from '@/shared/framework';
import { ChatItem } from './components';
import { getUserChats } from '@/shared/actions';
import { IChat } from '@/types';

export class Chats extends Block {
  constructor() {
    super({
      ChatList: [],
    });

    store.subscribe(state => {
      this.lists.ChatList = this.getChatList(state.chats ?? []);
    });

    store.subscribe(state => {
      getUserChats(state);
    });
  }

  getChatList(chats: IChat[]): Block[] {
    return chats.map(chat => new ChatItem({ chat, onClick: () => store.dispatch({ type: 'SELECT_CHAT', chat }) }));
  }

  override render(): string {
    return `
      <div class="chats">
        {{{ ChatList }}}
      </div>
    `;
  }
}
