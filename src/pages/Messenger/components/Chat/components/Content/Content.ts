import { Block, store } from '@/shared/framework';
import { MessageItem } from './components';
import { IMessage } from '@/types';

export class Content extends Block {
  constructor() {
    super({
      Messages: [],
    });

    store.subscribe(state => {
      if (
        state.messages &&
        (this.props.messages !== state.messages ||
          (this.props.messages && this.props.messages.length < state.messages.length))
      ) {
        this.lists.Messages = this.getMessages(state.messages, state.user?.id);
      }
    });
  }

  getMessages(messages: IMessage[], userId: number | undefined): Block[] {
    return messages.map(message => new MessageItem({ message, own: userId === message.user_id }));
  }

  scrollToBottom() {
    const content = this.getContent();
    if (content) {
      content.scrollTo(0, content.scrollHeight);
    }
  }

  override render(): string {
    return `
      <div class="chat-content">{{{ Messages }}}</div>
    `;
  }
}
