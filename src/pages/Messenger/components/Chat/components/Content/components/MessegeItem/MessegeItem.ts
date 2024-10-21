import { Block } from '@/shared/framework';
import { handlerTextContent } from '@/shared/helpers/handlerTextContent';
import { BlockProps, IMessage } from '@/types';

interface MessageItemProps extends BlockProps {
  message: IMessage;
  own: boolean;
  onClick?: (e: Event) => void;
}

export class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
      classNames: `message-item&#32;${props.own ? 'own-message' : ''}`,
      content: handlerTextContent(props.message.content),
    });
  }

  override render(): string {
    return `
      <div class={{{ classNames }}}>
        <div class="message-content">{{{ content }}}</div>
      </div>`;
  }
}
