import { Block } from '../../framework';
import { BlockProps } from '../../types';

export interface InputProps extends BlockProps {
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
