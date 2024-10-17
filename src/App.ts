import { Router } from './framework';
import { AuthorizationPage, RegistrationPage, ChatPage, SettingsPage } from './pages';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('app');
    this.router
      .use(EPages.default, AuthorizationPage, {
        changePage: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.registration, RegistrationPage, {
        changePage: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.chat, ChatPage, {
        changePage: (p: EPages) => {
          this.router.go(p);
        },
      })
      .use(EPages.settings, SettingsPage, {
        changePage: (p: EPages) => {
          this.router.go(p);
        },
      })
      .start();
  }
}
