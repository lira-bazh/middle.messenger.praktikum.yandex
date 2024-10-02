import { Block } from '../../framework';

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onBlur?: (e: Event) => void;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => props.onBlur && props.onBlur(e),
      },
    });
  }

  override render(): string {
    return `
      <input
        class="text-field"
        name={{name}}
        type={{ type }}
        placeholder={{{ placeholder }}}
        {{#if required}}
          required
        {{/if}}
      >`;
  }
}
