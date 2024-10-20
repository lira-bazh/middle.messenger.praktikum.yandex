import { Block, store } from '@/shared/framework';
import { Input, Button } from '@/shared/components';
import { Header } from './components';
import { getTokenForWS } from '@/shared/api';
import { WS_URL } from '@/constants';

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

    store.subscribe(({ selectedChat }) => {
      if (this.props.selectedChat !== selectedChat) {
        this.setProps({ selectedChat });
        void this.openWS();
      }
    });
  }

  async openWS() {
    if (this.props.selectedChat) {
      const { token } = await getTokenForWS(this.props.selectedChat.id);

      const { user } = store.getState();

      if (user && token) {
        const socket = new WebSocket(`${WS_URL}/${user.id}/${this.props.selectedChat.id}/${token}`);

        socket.addEventListener('open', () => {
          console.log('Соединение установлено');
        });

        socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }

          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
          console.log('Получены данные', event.data);
        });

        socket.addEventListener('error', event => {
          console.log('Ошибка', event);
        });
      }
    }
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
