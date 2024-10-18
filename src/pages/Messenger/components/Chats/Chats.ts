import { Block, store } from '../../../../framework';
import { BlockProps } from '../../../../types';

interface ChatsProps extends BlockProps {
}

export class Chats extends Block {
  constructor(props: ChatsProps) {
    super({
      ...props,
    });

    void store.dispatch({
      type: 'GET_CHATS',
    });
  }

  override render(): string {
    return `
      <div class="chats">
      </div>
    `;
  }
}
