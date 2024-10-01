import { Block } from '../../framework';

interface ButtonProps {
  id: string;
  text: string;
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
    return '<button type="button" id={{id}}>{{ text }}</button>';
  }
}
