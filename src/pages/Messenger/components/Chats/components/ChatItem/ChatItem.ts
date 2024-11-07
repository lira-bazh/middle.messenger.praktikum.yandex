import { Block } from '@/shared/framework';
import { Image } from '@/shared/components';
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
      lastMessageContent: props.chat.last_message ? handlerTextContent(props.chat.last_message.content) : null,
      Avatar: new Image({
        className: 'chat-img',
        alt: 'Изображение чата',
        getSrc: () => props.chat.avatar,
      }),
    });
  }

  override render(): string {
    return `
      <div class="chat-item">
        {{{ Avatar }}}
        <div class="chat-item-info">
          <div class="chat-item-title">{{{ title }}}</div>
          {{#if lastMessageContent}}
            <div class="chat-item-last-message">{{{ lastMessageContent }}}</div>
          {{/if}}
        </div>
      </div>`;
  }
}
