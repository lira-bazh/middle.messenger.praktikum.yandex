import { Block, store } from '@/shared/framework';
import { Input, Button, Form } from '@/shared/components';
import { Header, Content } from './components';
import { validationForm } from '@/shared/helpers/validation';
import { getTokenForWS } from '@/shared/api';
import { WS_URL } from '@/constants';
import { IChat } from '@/types';

export class Chat extends Block {
  constructor() {
    super({
      AddMessageForm: new Form({
        fields: [
          new Input({
            name: 'message',
            type: 'text',
            placeholder: 'Введите&#32;текст&#32;сообщения',
          }),
        ],
        submitButton: new Button({
          text: '>',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          if (this.props.socket) {
            validationForm(e.target, data => {
              if (data.message) {
                this.props.socket.send(
                  JSON.stringify({
                    content: data.message,
                    type: 'message',
                  }),
                );

                if (e.target instanceof HTMLFormElement) {
                  e.target.reset();
                }
              }
            });
          }
        },
      }),
      Header: new Header(),
      Content: new Content(),
    });

    store.subscribe(({ selectedChat }) => {
      if (this.props.selectedChat?.id !== selectedChat?.id) {
        this.closeWS();

        if (selectedChat) {
          this.openWS(selectedChat).catch(error => console.error(error));
        }

        this.setProps({ selectedChat });
      }
    });
  }

  async openWS(selectedChat: IChat) {
    if (!this.props.socket) {
      const data = await getTokenForWS<{ token: string }>(selectedChat.id);

      const { user } = store.getState();

      if (user && !(data instanceof Error)) {
        const socket = new WebSocket(`${WS_URL}/${user.id}/${selectedChat.id}/${data.token}`);

        this.setProps({
          socket,
        });

        socket.addEventListener('open', () => {
          console.log('Соединение установлено');

          socket.send(
            JSON.stringify({
              content: '0',
              type: 'get old',
            }),
          );
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
          store.dispatch({ type: 'ADD_MESSAGES', data: JSON.parse(event.data) });
        });

        socket.addEventListener('error', event => {
          console.log('Ошибка', event);
        });
      }
    }
  }

  closeWS() {
    if (this.props.socket) {
      this.props.socket.close();
      this.setProps({
        socket: undefined,
      });
    }
  }

  override render(): string {
    return `
      <div class="chat">
        {{#if selectedChat}}
          {{{ Header }}}
          {{{ Content }}}
          <div class="message-creator">
            {{{ AddMessageForm }}}
          </div>
        {{else}}
          <div class="empty-selected-chat">Выберите чат</div>
        {{/if}}
      </div>`;
  }
}
