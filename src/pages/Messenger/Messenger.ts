import { Block } from '@/shared/framework';
import { Chats, Menu, Chat } from './components';

export class MessengerPage extends Block {
  constructor() {
    super({
      Chats: new Chats(),
      Menu: new Menu(),
      Chat: new Chat(),
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
