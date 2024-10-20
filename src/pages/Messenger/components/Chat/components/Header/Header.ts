import { Block, store } from '@/framework';
import { CloseIcon, TrashIcon } from '@/shared/components';
import { removeSelectedChat } from '@/shared/api';

export class Header extends Block {
  constructor() {
    super({
      CloseIcon: new CloseIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          void store.dispatch({ type: 'CLOSE_SELECTED_CHAT' });
        },
      }),
      TrashIcon: new TrashIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          void removeSelectedChat().then(() => {
            store.dispatch({ type: 'REMOVE_SELECTED_CHAT' });
          });
        },
      }),
      // PlusIcon: new PlusIcon({
      //   onClick: (e: Event) => {
      //     e.preventDefault();
      //   },
      // }),
    });

    store.subscribe(state => {
      this.setProps({ title: state.selectedChat?.title });
    });
  }

  override render(): string {
    return `
      <div class="chat-header"><div class="chat-header-title">{{{ title }}}</div>{{{ TrashIcon }}}{{{ CloseIcon }}}</div>`;
  }
}
