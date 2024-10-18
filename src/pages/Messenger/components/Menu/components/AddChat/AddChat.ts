import { Block } from '@/framework';
import { Input, Button } from '@/components';

export class AddChat extends Block {
  constructor() {
    super({
      InputAddChat: new Input({
        name: 'title',
        type: 'text',
        placeholder: 'Введите&nbsp;название&nbsp;нового&nbsp;чата',
      }),
      ButtonAddChat: new Button({
        text: '>',
      }),
    });

    this.hide();
  }

  override render(): string {
    return `
      <div class="add-chat">{{{ InputAddChat }}}{{{ ButtonAddChat }}}</div>
    `;
  }
}
