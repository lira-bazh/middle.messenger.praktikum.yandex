import { Block } from '../../framework';
import { Input, InputProps } from '..';

interface InputWithLabelProps extends InputProps {
  label?: string;
}

export class InputWithLabel extends Block {
  constructor({ label, ...props }: InputWithLabelProps) {
    super({
      label,
      Content: new Input(props),
    });
  }

  override render(): string {
    return `
      <label>
        {{ label }}
        {{{ Content }}}
      </label>`;
  }
}
