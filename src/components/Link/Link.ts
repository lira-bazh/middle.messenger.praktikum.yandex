import { Block } from '../../framework';

interface LinkProps {
  id: string;
  content: string | Block;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return '<a href="/" id={{id}}>{{{content}}}</a>';
  }
}
