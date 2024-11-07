import { Block, store } from '@/shared/framework';
import { CloseIcon, TrashIcon, PlusIcon, UsersIcon, AddImageIcon, FileLoader, Image } from '@/shared/components';
import { changePage, closeSelectedChat, removeSelectedChat, changeChatImage } from '@/shared/actions';
import { EPages, IStore } from '@/types';

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
      UsersIcon: new UsersIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.usersInChat);
        },
      }),
      AddChatImage: new FileLoader({
        content: new AddImageIcon({}),
        onChange: (e: Event) => {
          e.preventDefault();
          if (e.target instanceof HTMLInputElement && e.target.files?.length) {
            changeChatImage(e.target.files[0]);
          }
        },
      }),
      Avatar: new Image({
        className: 'chat-img',
        alt: 'Изображение чата',
        getSrc: (state?: IStore) => state?.selectedChat?.avatar,
      }),
    });

    store.subscribe(state => {
      this.setProps({ title: state.selectedChat?.title });
    });
  }

  override render(): string {
    return `
      <div class="chat-header"><div class="chat-header-title">{{{ Avatar }}}{{{ title }}}</div>{{{ AddChatImage }}}{{{ PlusIcon }}}{{{ UsersIcon }}}{{{ TrashIcon }}}{{{ CloseIcon }}}</div>`;
  }
}
