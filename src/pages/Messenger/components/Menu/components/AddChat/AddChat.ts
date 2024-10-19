import { Block, store } from '@/framework';
import { Input, Button, Form } from '@/components';
import { validationInput, validationRules, validationForm, nameErrorMsg } from '@/helpers/validation';

export class AddChat extends Block {
  constructor() {
    super({
      AddChatForm: new Form({
        fields: [
          new Input({
            name: 'title',
            type: 'text',
            placeholder: 'Введите&nbsp;название&nbsp;нового&nbsp;чата',
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

          validationForm(e.target, async data => {
            await store.dispatch({
              type: 'CREATE_CHAT',
              data,
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
