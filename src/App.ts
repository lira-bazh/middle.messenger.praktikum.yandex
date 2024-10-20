import { Router } from './shared/framework';
import { AuthorizationPage, RegistrationPage, MessengerPage, SettingsPage, ChangePasswordPage } from './pages';
import { ROOT_TAG } from '@/constants';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router(ROOT_TAG);
    const commonProps = {
      changePage: (p: EPages) => {
        this.router.go(p);
      },
    };

    this.router
      .use(EPages.default, AuthorizationPage)
      .use(EPages.registration, RegistrationPage)
      .use(EPages.messenger, MessengerPage, commonProps)
      .use(EPages.settings, SettingsPage)
      .use(EPages.password, ChangePasswordPage)
      .start();
  }
}
