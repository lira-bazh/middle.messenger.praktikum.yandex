import { Block, store } from '@/shared/framework';
import { Link } from '@/shared/components';
import { UserItem } from './components';
import { changePage, updateUsersByChat } from '@/shared/actions';
import { EPages, IUser } from '@/types';

export class UsersInChatPage extends Block {
  constructor() {
    super({
      LinkToAddUser: new Link({
        content: 'Добавить участника',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.selectUser);
        },
      }),
      Link: new Link({
        content: 'Вернуться в чат',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.messenger);
        },
      }),
      Users: [],
    });

    store.subscribe(state => {
      if (state.selectedChat?.users) {
        this.lists.Users = this.getUserList(state.selectedChat.users);
      }
    });

    store.subscribe(({ selectedChat }) => {
      if (!selectedChat) {
        changePage(EPages.messenger);
      } else if (!selectedChat?.users) {
        updateUsersByChat();
      }
    });
  }

  getUserList(users: IUser[]): Block[] {
    return users.map(user => new UserItem({ user }));
  }

  override render() {
    return `
    <main class="page users-in-chat-page">
      <div class="form-wrapper">
        <h1>Участники чата</h1>
        <div class="users">
          {{{ Users }}}
        </div>
        {{{ LinkToAddUser }}}
        {{{ Link }}}
      </div>
    </main>`;
  }
}
