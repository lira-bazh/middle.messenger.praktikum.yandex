import Handlebars from 'handlebars';
import {
  Authorization,
  Registration,
  Error,
  Chat,
  Settings,
  Links,
} from './pages';
import { Input, Button, Link, DefaultProfileImg } from './partials';

enum EPages {
  links = 'links',
  authorization = 'authorization',
  registration = 'registration',
  chat = 'chat',
  settings = 'settings',
  error500 = '500',
  error404 = '404',
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('DefaultProfileImg', DefaultProfileImg);

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
    let template: Handlebars.TemplateDelegate<string>;
    let templateParams: string = '';

    switch (this.state.currentPage) {
      case EPages.links:
        template = Handlebars.compile(Links);
        break;
      case EPages.authorization:
        template = Handlebars.compile(Authorization);
        break;
      case EPages.registration:
        template = Handlebars.compile(Registration);
        break;
      case EPages.chat:
        template = Handlebars.compile(Chat);
        break;
      case EPages.settings:
        template = Handlebars.compile(Settings);
        break;
      case EPages.error500:
        template = Handlebars.compile(Error);
        templateParams = JSON.stringify({
          code: 500,
          description: 'Скоро всё точно заработает',
        });
        break;
      case EPages.error404:
      default:
        template = Handlebars.compile(Error);
        templateParams = JSON.stringify({
          code: 404,
          description: 'Страница не найдена',
        });
        break;
    }

    if (this.app) {
      this.app.innerHTML = template(templateParams);
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
        this.createEntryBtnEvent();
        this.createLinkEvent(EPages.registration);
        break;
      }
      case EPages.registration: {
        this.createEntryBtnEvent();
        this.createLinkEvent(EPages.authorization);
        break;
      }
      case EPages.chat: {
        this.createLinkEvent(EPages.settings);
        break;
      }
    }
  }

  createEntryBtnEvent() {
    const entryButton = document.getElementById('entry-button');

    if (entryButton) {
      entryButton.addEventListener('click', () => {
        this.changePage(EPages.chat);
      });
    }
  }

  createLinkEvent(page: EPages): void {
    const link = document.getElementById(`to-${page}`);

    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(page);
      });
    }
  }
}
