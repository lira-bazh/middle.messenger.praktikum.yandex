import { Router } from './framework/Router';
import { AuthorizationPage, RegistrationPage, ChatPage, SettingsPage } from './pages';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('app');
  }

  render(): void {
    this.router
      .use(EPages.default, AuthorizationPage, {
        onLogin: () => {
          this.router.go(EPages.chat);
        },
        onLinkClick: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.registration, RegistrationPage, {
        onLogin: () => {
          this.router.go(EPages.chat);
        },
        onLinkClick: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.chat, ChatPage, {
        onLinkClick: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.settings, SettingsPage, {
        onSave: () => {
          this.router.go(EPages.chat);
        },
      })
      .start();
  }
}
