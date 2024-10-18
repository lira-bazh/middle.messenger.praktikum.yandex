import { Block, store } from '../../framework';
import { Input, Button } from '../../components';
import { Chats, Menu } from './components';

import { EPages, BlockProps } from '../../types';

interface MessengerPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

export class MessengerPage extends Block {
  constructor({ changePage }: MessengerPageProps) {
    super({
      Chats: new Chats({}),
      Menu: new Menu({ changePage }),
      InputMessage: new Input({
        name: 'message',
        type: 'text',
        placeholder: 'Введите&nbsp;текст&nbsp;сообщения',
      }),
      ButtonSend: new Button({
        text: '>',
      }),
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
      <div class="messanger">
        <div class="messanger-content"></div>
        <div class="messanger-creator">
          {{{ InputMessage }}}
          {{{ ButtonSend }}}
        </div>
      </div>
    </main>`;
  }
}
