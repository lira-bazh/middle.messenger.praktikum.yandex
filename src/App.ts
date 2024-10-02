import { LinksPage, AuthorizationPage, RegistrationPage, ChatPage, SettingsPage, ErrorPage } from './pages';

enum EPages {
  links = 'links',
  authorization = 'authorization',
  registration = 'registration',
  chat = 'chat',
  settings = 'settings',
  error500 = '500',
  error404 = '404',
}

export default class App {
  state: {
    currentPage: EPages;
  };

  app: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: EPages.links,
    };
    this.app = document.getElementById('app');
  }

  render(): void {
    let page: LinksPage | undefined;

    switch (this.state.currentPage) {
      case EPages.links:
        page = new LinksPage();
        break;
      case EPages.authorization:
        page = new AuthorizationPage({
          onLogin: () => {
            this.changePage(EPages.chat);
          },
        });
        break;
      case EPages.registration:
        page = new RegistrationPage({
          onLogin: () => {
            this.changePage(EPages.chat);
          },
        });
        break;
      case EPages.chat:
        page = new ChatPage();
        break;
      case EPages.settings:
        page = new SettingsPage({
          onSave: () => {
            this.changePage(EPages.chat);
          },
        });
        break;
      case EPages.error500:
        page = new ErrorPage({
          code: 500,
          description: 'Скоро всё точно заработает',
        });
        break;
      case EPages.error404:
      default:
        page = new ErrorPage({
          code: 404,
          description: 'Страница не найдена',
        });
        break;
    }

    if (this.app && page) {
      this.app.replaceChildren(page.getContent());
      this.attachEventListeners();
    }
  }

  changePage(page: EPages) {
    this.state.currentPage = page;
    this.render();
  }

  attachEventListeners() {
    switch (this.state.currentPage) {
      case EPages.links: {
        this.createLinkEvent(EPages.authorization);
        this.createLinkEvent(EPages.registration);
        this.createLinkEvent(EPages.chat);
        this.createLinkEvent(EPages.settings);
        this.createLinkEvent(EPages.error404);
        this.createLinkEvent(EPages.error500);
        break;
      }
      case EPages.authorization: {
        this.createLinkEvent(EPages.registration);
        break;
      }
      case EPages.registration: {
        this.createLinkEvent(EPages.authorization);
        break;
      }
      case EPages.chat: {
        this.createLinkEvent(EPages.settings);
        break;
      }
    }
  }

  createLinkEvent(page: EPages): void {
    const link = document.getElementById(`to-${page}`);

    if (link) {
      link.addEventListener('click', e => {
        e.preventDefault();
        this.changePage(page);
      });
    }
  }
}
