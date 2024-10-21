import { Block, store } from '@/shared/framework';
import { CloseIcon, TrashIcon, PlusIcon } from '@/shared/components';
import { changePage, closeSelectedChat, removeSelectedChat } from '@/shared/actions';
import { EPages } from '@/types';

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
      PlusIcon: new PlusIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.selectUser);
        },
      }),
    });

    store.subscribe(state => {
      this.setProps({ title: state.selectedChat?.title });
    });
  }

  override render(): string {
    return `
      <div class="chat-header"><div class="chat-header-title">{{{ title }}}</div>{{{ PlusIcon }}}{{{ TrashIcon }}}{{{ CloseIcon }}}</div>`;
  }
}
