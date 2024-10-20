import { Block } from '@/framework';
import { Link } from '@/shared/components';
import { logout } from '@/shared/api';
import { BlockProps, EPages } from '@/types';

interface MenuSettingsProps extends BlockProps {
  changePage: (page: EPages) => void;
}

export class MenuSettings extends Block {
  constructor({ changePage }: MenuSettingsProps) {
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
          void logout().then(() => {
            changePage(EPages.default);
          });
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
