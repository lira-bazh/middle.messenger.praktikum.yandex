import { Block } from '@/shared/framework';
import { MenuIcon, PlusIcon } from '@/shared/components';
import { MenuSettings, Search, AddChat } from './components';

export class Menu extends Block {
  constructor() {
    super({
      MenuSettings: new MenuSettings(),
      Search: new Search(),
      AddChat: new AddChat(),
      MenuIcon: new MenuIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          this.children.Search.hide();
          this.children.AddChat.hide();
          this.children.MenuSettings.toggleVisible();
        },
      }),
      PlusIcon: new PlusIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          this.children.Search.hide();
          this.children.AddChat.toggleVisible();
          this.children.MenuSettings.hide();
        },
      }),
      // SearchIcon: new SearchIcon({
      //   onClick: (e: Event) => {
      //     e.preventDefault();
      //     this.children.Search.toggleVisible();
      //     this.children.AddChat.hide();
      //     this.children.MenuSettings.hide();
      //   },
      // }),
    });
  }

  override render(): string {
    return `
      <div class="menu">
        <div class="menu-icons">
          <div class="left-menu-icons">{{{ MenuIcon }}}</div>
          {{{ PlusIcon }}}
          {{{ SearchIcon }}}
        </div>
        {{{ Search }}}
        {{{ AddChat }}}
        {{{ MenuSettings }}}
      </div>
    `;
  }
}
