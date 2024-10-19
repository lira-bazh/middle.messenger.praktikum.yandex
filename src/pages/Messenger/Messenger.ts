import { Block, store } from '@/framework';
import { Chats, Menu, Chat } from './components';
import { EPages, BlockProps } from '@/types';

interface MessengerPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

export class MessengerPage extends Block {
  constructor({ changePage }: MessengerPageProps) {
    super({
      Chats: new Chats(),
      Menu: new Menu({ changePage }),
      Chat: new Chat(),
    });

    void store.dispatch({
      type: 'GET_USER',
      changePage,
    });
  }

  override render() {
    return `
    <main class="page messenger-page">
      <div class="menu-and-chats">
        {{{ Menu }}}
        {{{ Chats }}}
      </div>
      {{{ Chat }}}
    </main>`;
  }
}
