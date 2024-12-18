import { Block } from '@/shared/framework';
import { Input } from '@/shared/components';

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
