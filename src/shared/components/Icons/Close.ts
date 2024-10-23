import { Block } from '@/shared/framework';
import { BlockProps } from '@/types';

interface CloseIconProps extends BlockProps {
  onClick?: (e: Event) => void;
}

export class CloseIcon extends Block {
  constructor(props: CloseIconProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
    <svg class="icon close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
