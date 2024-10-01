import { Link } from '../../partials';
import { Block } from '../../framework';

export class LinksPage extends Block {
  constructor() {
    super({
      LinkAuthorization: new Link({
        id: 'to-authorization',
        content: 'Страница авторизации',
        onClick: e => {
          e.preventDefault();
        },
      }),
      LinkChat: new Link({
        id: 'to-chat',
        content: 'Страница чата',
        onClick: e => {
          e.preventDefault();
        },
      }),
      LinkRegistration: new Link({
        id: 'to-registration',
        content: 'Страница регистрации',
        onClick: e => {
          e.preventDefault();
        },
      }),
      LinkSettings: new Link({
        id: 'to-settings',
        content: 'Страница настроек',
        onClick: e => {
          e.preventDefault();
        },
      }),
      Link404: new Link({
        id: 'to-404',
        content: 'Страница ошибки 404',
        onClick: (e: Event) => {
          e.preventDefault();
        },
      }),
      Link500: new Link({
        id: 'to-500',
        content: 'Страница ошибки 500',
        onClick: (e: Event) => {
          e.preventDefault();
        },
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <nav class="navigation">
        <ul class="links">
          <li class="link">{{{LinkAuthorization}}}</li>
          <li class="link">{{{LinkChat}}}</li>
          <li class="link">{{{LinkRegistration}}}</li>
          <li class="link">{{{LinkSettings}}}</li>
          <li class="link">{{{Link404}}}</li>
          <li class="link">{{{Link500}}}</li>
        </ul>
      </nav>
    </main>`;
  }
}
