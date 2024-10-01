import { Block } from '../../framework';

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return `<label>
      {{ label }}
      <input
        class="text-field"
        name={{name}}
        type={{ type }}
        placeholder={{{ placeholder }}}
      >
    </label>`;
  }
}
