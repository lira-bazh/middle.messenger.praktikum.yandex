import { Router } from './framework';
import { AuthorizationPage, RegistrationPage, MessengerPage, SettingsPage, ChangePasswordPage } from './pages';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('app');
    const commonProps = {
      changePage: (p: EPages) => {
        this.router.go(p);
      },
    };

    this.router
      .use(EPages.default, AuthorizationPage, commonProps)
      .use(EPages.registration, RegistrationPage, commonProps)
      .use(EPages.messenger, MessengerPage, commonProps)
      .use(EPages.settings, SettingsPage, commonProps)
      .use(EPages.password, ChangePasswordPage, commonProps)
      .start();
  }
}
