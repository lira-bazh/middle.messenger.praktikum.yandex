import { Block } from '@/framework';
import { BlockProps } from '@/types';

interface LinkProps extends BlockProps {
  content: string | Block;
  onClick?: (e: Event) => void | Promise<void>;
}

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
    return '<a href="/">{{{content}}}</a>';
  }
}
