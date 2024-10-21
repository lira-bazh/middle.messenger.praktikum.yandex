import { Block } from '@/shared/framework';
import { Input, InputProps } from '..';

export interface InputWithLabelProps extends InputProps {
  label?: string;
  error?: string;
}

export class InputWithLabel extends Block {
  constructor({ label, error, ...props }: InputWithLabelProps) {
    super({
      label,
      error,
      Content: new Input(props),
    });
  }

  override render(): string {
    return `
      <label>
        {{ label }}
        {{{ Content }}}
        {{#if error}}
          <span class="input-error">{{error}}</span>
        {{/if}}
      </label>`;
  }
}
