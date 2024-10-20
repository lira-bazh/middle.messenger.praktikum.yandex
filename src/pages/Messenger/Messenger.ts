import { Block, store } from '@/shared/framework';
import { Chats, Menu, Chat } from './components';
import { authUser } from '@/shared/api';
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

    void authUser().then(data => {
      void store.dispatch({
        type: 'GET_USER',
        data,
      });
    }).catch(() => {
      changePage(EPages.default);
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
