import { expect } from 'chai';
import { Router } from './Router';
import {
  AuthorizationPage,
  RegistrationPage,
  MessengerPage,
  SettingsPage,
  ChangePasswordPage,
  SelectUserPage,
} from '@/pages';
import { ROOT_TAG } from '@/constants';
import { EPages } from '@/types';

describe('Тестирование Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(ROOT_TAG);

    router
      .use(EPages.default, AuthorizationPage)
      .use(EPages.registration, RegistrationPage)
      .use(EPages.messenger, MessengerPage)
      .use(EPages.settings, SettingsPage)
      .use(EPages.password, ChangePasswordPage)
      .use(EPages.selectUser, SelectUserPage)
      .start();
  });

  it('Проверка соответствия страницы', () => {
    const page = router.getRoute(EPages.default);

    expect(page?.match(EPages.default)).to.be.eq(true);
  });

  it('Проверка перехода по страницам', () => {
    router.go(EPages.registration);

    expect(window.location.pathname).to.be.eq(EPages.registration);
  });

  it('Проверка рендера страницы', () => {
    router.go(EPages.registration);
    const page = document.getElementById(ROOT_TAG)?.innerHTML;

    expect(page).to.include('Регистрация');
  });
});
