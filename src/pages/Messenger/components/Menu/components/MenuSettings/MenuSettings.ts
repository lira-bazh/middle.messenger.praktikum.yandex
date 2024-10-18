import { Block } from '@/framework';
import { Link } from '@/components';
import { HTTPTransport } from '@/helpers/request';
import { ENDPOINTS } from '@/constants';
import { BlockProps, EPages } from '@/types';

interface MenuSettingsProps extends BlockProps {
  changePage: (page: EPages) => void;
}

export class MenuSettings extends Block {
  constructor({ changePage }: MenuSettingsProps) {
    super({
      LinkToSettings: new Link({
        content: 'Именить профиль прользователя',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.settings);
        },
      }),
      LinkToChangePassword: new Link({
        content: 'Именить пароль пользователя',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.password);
        },
      }),
      LinkToLogout: new Link({
        content: 'Выйти из чата',
        onClick: async (e: Event) => {
          e.preventDefault();
          await new HTTPTransport().post(ENDPOINTS.logout).then(() => {
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
