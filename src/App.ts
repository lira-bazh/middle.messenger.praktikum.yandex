import { Router } from './framework/Router';
import { AuthorizationPage, RegistrationPage, ChatPage, SettingsPage } from './pages';
import { EPages } from './types';

export default class App {
  router: Router;

  constructor() {
    this.router = new Router('.app');
    this.router
      .use(EPages.default, AuthorizationPage)
      .use(EPages.registration, RegistrationPage)
      .use(EPages.chat, ChatPage)
      .use(EPages.settings, SettingsPage);
  }

  render(): void {
    // let page: LinksPage | undefined;

    // switch (this.state.currentPage) {
    //   case EPages.links:
    //     page = new LinksPage({
    //       onLinkClick: (p: EPages) => {
    //         this.changePage(p);
    //       },
    //     });
    //     break;
    //   case EPages.authorization:
    //     page = new AuthorizationPage({
    //       onLogin: () => {
    //         this.changePage(EPages.chat);
    //       },
    //       onLinkClick: (p: EPages) => {
    //         this.changePage(p);
    //       },
    //     });
    //     break;
    //   case EPages.registration:
    //     page = new RegistrationPage({
    //       onLogin: () => {
    //         this.changePage(EPages.chat);
    //       },
    //       onLinkClick: (p: EPages) => {
    //         this.changePage(p);
    //       },
    //     });
    //     break;
    //   case EPages.chat:
    //     page = new ChatPage({
    //       onLinkClick: (p: EPages) => {
    //         this.changePage(p);
    //       },
    //     });
    //     break;
    //   case EPages.settings:
    //     page = new SettingsPage({
    //       onSave: () => {
    //         this.changePage(EPages.chat);
    //       },
    //     });
    //     break;
    //   case EPages.error500:
    //     page = new ErrorPage({
    //       code: 500,
    //       description: 'Скоро всё точно заработает',
    //     });
    //     break;
    //   case EPages.error404:
    //   default:
    //     page = new ErrorPage({
    //       code: 404,
    //       description: 'Страница не найдена',
    //     });
    //     break;
    // }

    // if (this.app && page) {
    //   this.app.replaceChildren(page.getContent());
    // }
    this.router.start();
  }

  // changePage(page: EPages) {
  //   this.state.currentPage = page;
  //   this.render();
  // }
}
