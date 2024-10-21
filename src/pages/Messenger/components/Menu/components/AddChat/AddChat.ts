import { Block, store } from '@/shared/framework';
import { Input, Button, Form } from '@/shared/components';
import { validationInput, validationRules, validationForm, nameErrorMsg } from '@/shared/helpers/validation';
import { createChat } from '@/shared/api';

export class AddChat extends Block {
  constructor() {
    super({
      AddChatForm: new Form({
        fields: [
          new Input({
            name: 'title',
            type: 'text',
            placeholder: 'Введите&#32;название&#32;нового&#32;чата',
            required: true,
            error: nameErrorMsg,
            onBlur: (e: Event) => {
              if (e?.target && e.target instanceof HTMLInputElement) {
                validationInput(e.target, validationRules[e.target.name as keyof typeof validationRules]);
              }
            },
          }),
        ],
        submitButton: new Button({
          text: '>',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, data => {
            void createChat(data).then(result => {
              store.dispatch({
                type: 'CREATE_CHAT',
                data: result,
              });
            });
          });
        },
      }),
    });

    this.hide();
  }

  override render(): string {
    return `
      <div class="add-chat">{{{ AddChatForm }}}</div>
    `;
  }
}
