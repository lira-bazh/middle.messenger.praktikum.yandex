import { Block } from '@/shared/framework';
import { BlockProps, IChat } from '@/types';

interface ChatItemProps extends BlockProps {
  chat: IChat;
  onClick?: (e: Event) => void;
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
      <div class="chat-item">
        {{{ chat.title }}}
      </div>`;
  }
}
