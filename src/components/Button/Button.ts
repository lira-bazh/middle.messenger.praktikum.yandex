import { Block } from '../../framework';

interface ButtonProps {
  id: string;
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
      id={{id}}
      {{#if type}}
        type={{ type }}
      {{else}}
        type="button"
      {{/if}}>
        {{ text }}
      </button>`;
  }
}