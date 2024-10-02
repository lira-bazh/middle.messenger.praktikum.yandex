import { Link } from '../../components';
import { Block } from '../../framework';

export class LinksPage extends Block {
  constructor() {
    super({
      LinkAuthorization: new Link({
        id: 'to-authorization',
        content: 'Страница авторизации',
      }),
      LinkChat: new Link({
        id: 'to-chat',
        content: 'Страница чата',
      }),
      LinkRegistration: new Link({
        id: 'to-registration',
        content: 'Страница регистрации',
      }),
      LinkSettings: new Link({
        id: 'to-settings',
        content: 'Страница настроек',
      }),
      Link404: new Link({
        id: 'to-404',
        content: 'Страница ошибки 404',
      }),
      Link500: new Link({
        id: 'to-500',
        content: 'Страница ошибки 500',
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
