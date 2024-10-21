import { Block } from '@/shared/framework';
import { BlockProps } from '@/types';

interface PlusIconProps extends BlockProps {
  onClick?: (e: Event) => void;
}

export class PlusIcon extends Block {
  constructor(props: PlusIconProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
    <svg class="icon plus-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
