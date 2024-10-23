import { Block } from '@/shared/framework';
import { Link } from '@/shared/components';
import { exitMessenger, changePage } from '@/shared/actions';
import { EPages } from '@/types';

export class MenuSettings extends Block {
  constructor() {
    super({
      LinkToSettings: new Link({
        content: 'Именить профиль',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.settings);
        },
      }),
      LinkToChangePassword: new Link({
        content: 'Именить пароль',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.password);
        },
      }),
      LinkToLogout: new Link({
        content: 'Выйти',
        onClick: (e: Event) => {
          e.preventDefault();
          exitMessenger();
        },
      }),
    });

    this.hide();
  }

  override render(): string {
    return `
      <div class="menu-settings">
        {{{ LinkToSettings }}}
        {{{ LinkToChangePassword }}}
        {{{ LinkToLogout }}}
      </div>
    `;
  }
}
