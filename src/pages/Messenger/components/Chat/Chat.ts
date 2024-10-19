import { Block, store } from '@/framework';
import { Input, Button } from '@/components';
import { Header } from './components';


export class Chat extends Block {
  constructor() {
    super({
      InputMessage: new Input({
        name: 'message',
        type: 'text',
        placeholder: 'Введите&nbsp;текст&nbsp;сообщения',
      }),
      ButtonSend: new Button({
        text: '>',
      }),
      Header: new Header(),
    });

    store.subscribe(state => {
      console.log('selectedChat', state.selectedChat);
      this.setProps({ selectedChat: state.selectedChat });
    });
  }

  override render(): string {
    return `
      <div class="chat">
        {{#if selectedChat}}
          {{{ Header }}}
          <div class="chat-content"></div>
          <div class="message-creator">
            {{{ InputMessage }}}
            {{{ ButtonSend }}}
          </div>
        {{else}}
          <div class="empty-selected-chat">Выберите чат</div>
        {{/if}}
      </div>`;
  }
}
