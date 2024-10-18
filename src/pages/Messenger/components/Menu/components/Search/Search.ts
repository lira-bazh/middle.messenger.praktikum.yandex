import { Block } from '@/framework';
import { Input } from '@/components';

export class Search extends Block {
  constructor() {
    super({
      InputSearch: new Input({
        name: 'search',
        type: 'text',
        placeholder: '',
      }),
    });

    this.hide();
  }

  override render(): string {
    return `
      <div class="search">{{{ InputSearch }}}</div>
    `;
  }
}
