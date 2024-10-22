import { Block, store } from '@/shared/framework';
import { Input, Button, Form, Link } from '@/shared/components';
import { FoundUser } from './components';
import { validationForm } from '@/shared/helpers/validation';
import { searchUser } from '@/shared/api';
import { changePage, addUserToChat } from '@/shared/actions';
import { EPages, IUser } from '@/types';

export class SelectUserPage extends Block {
  constructor() {
    super({
      Link: new Link({
        content: 'Вернуться',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.messenger);
        },
      }),
      SelectUserForm: new Form({
        fields: [
          new Input({
            name: 'login',
            type: 'text',
            placeholder: 'Введите&#32;логин&#32;пользователя',
          }),
        ],
        submitButton: new Button({
          text: '>',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, data => {
            searchUser(data)
              .then((users: IUser[]) => {
                this.lists.FoundUsers = users.map(
                  user => new FoundUser({ user, onClick: () => addUserToChat(user.id) }),
                );
              })
              .catch(error => console.error(error));
          });
        },
      }),
      FoundUsers: [],
    });

    store.subscribe(({ selectedChat }) => {
      if (!selectedChat) {
        changePage(EPages.messenger);
      }
    });
  }

  override render() {
    return `
    <main class="page select-user-page">
      <div class="form-wrapper">
        <h1>Добавить пользователя</h1>
        {{{ SelectUserForm}}}
        <div class="found-users">
          {{{ FoundUsers}}}
        </div>
        {{{ Link }}}
      </div>
    </main>`;
  }
}
