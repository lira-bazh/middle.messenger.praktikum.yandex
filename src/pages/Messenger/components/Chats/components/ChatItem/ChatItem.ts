import { Block } from '@/shared/framework';
import { handlerTextContent } from '@/shared/helpers/handlerTextContent';
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
      title: handlerTextContent(props.chat.title),
    });
  }

  override render(): string {
    return `
      <div class="chat-item">
        {{{ title }}}
      </div>`;
  }
}
