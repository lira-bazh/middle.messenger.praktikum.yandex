import { Router, store } from './shared/framework';
import {
  AuthorizationPage,
  RegistrationPage,
  MessengerPage,
  SettingsPage,
  ChangePasswordPage,
  SelectUserPage,
} from './pages';
import { getUser } from '@/shared/actions';
import { ROOT_TAG } from '@/constants';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router(ROOT_TAG);

    this.router
      .use(EPages.default, AuthorizationPage)
      .use(EPages.registration, RegistrationPage)
      .use(EPages.messenger, MessengerPage)
      .use(EPages.settings, SettingsPage)
      .use(EPages.password, ChangePasswordPage)
      .use(EPages.selectUser, SelectUserPage)
      .start();

    store.subscribe(state => {
      getUser(state);
    });
  }
}
