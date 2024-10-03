import { Block } from '../../framework';
import { BlockProps } from '../../types';

interface FormProps extends BlockProps {
  fields: Block[];
  submitButton: Block;
  onSubmit: (e: Event) => void;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => props.onSubmit && props.onSubmit(e),
      },
    });
  }

  override render(): string {
    return `
      <form class="form">
        <div class="fields">
          {{{ fields }}}
        </div>
        {{{ submitButton }}}
      </form>
    `;
  }
}
