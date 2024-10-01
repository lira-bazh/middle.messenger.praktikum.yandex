import { Block } from '../../framework';
import { LinkProps } from '../../types';

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return '<a href="/" id={{id}}>{{content}}</a>';
  }
}
