import { Block } from '@/shared/framework';
import { BlockProps } from '@/types';

interface ButtonProps extends BlockProps {
  id?: string;
  text: string;
  type?: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `<button
      {{#if id}}
        id={{id}}
      {{/if}}
      {{#if type}}
        type={{ type }}
      {{else}}
        type="button"
      {{/if}}>
        {{ text }}
      </button>`;
  }
}
