import { Link, Input, Button, DefaultProfileImg } from '../../components';
import { Block } from '../../framework';

export class ChatPage extends Block {
  constructor() {
    super({
      LinkToSettings: new Link({
        id: 'to-registration',
        content: new DefaultProfileImg(),
      }),
      InputSearch: new Input({
        name: 'search',
        type: 'text',
        placeholder: '',
      }),
      InputMessage: new Input({
        name: 'message',
        type: 'text',
        placeholder: 'Введите&nbsp;текст&nbsp;сообщения',
      }),
      ButtonSend: new Button({
        id: 'send-button',
        text: '>',
      }),
    });
  }

  override render() {
    return `
    <main class="page chat-page">
      <div class="menu">
        <div class="profile">{{{ LinkToSettings }}}</div>
        <div class="chats">
          <div class="search">{{{ InputSearch }}}</div>
          <div class="chats-list"></div>
        </div>
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
