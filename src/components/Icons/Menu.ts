import { Block } from '@/framework';
import { BlockProps } from '@/types';

interface MenuIconProps extends BlockProps {
  onClick?: (e: Event) => void;
}

export class MenuIcon extends Block {
  constructor(props: MenuIconProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
    <svg class="icon menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
