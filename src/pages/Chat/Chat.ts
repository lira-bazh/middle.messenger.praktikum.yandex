import { Link, Input, Button, DefaultProfileImg } from '../../components';
import { Block } from '../../framework';
import { EPages, BlockProps } from '../../types';

interface ChatPageProps extends BlockProps {
  onLinkClick: (page: EPages) => void;
}
export class ChatPage extends Block {
  constructor({ onLinkClick }: ChatPageProps) {
    super({
      LinkToSettings: new Link({
        content: new DefaultProfileImg(),
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.settings);
        },
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
