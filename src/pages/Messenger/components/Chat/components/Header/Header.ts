import { Block, store } from '@/shared/framework';
import { CloseIcon, TrashIcon } from '@/shared/components';
import { closeSelectedChat, removeSelectedChat } from '@/shared/actions';

export class Header extends Block {
  constructor() {
    super({
      CloseIcon: new CloseIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          closeSelectedChat();
        },
      }),
      TrashIcon: new TrashIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          removeSelectedChat();
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
