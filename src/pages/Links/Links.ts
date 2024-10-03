import { Link } from '../../components';
import { Block } from '../../framework';
import { EPages, BlockProps } from '../../types';

interface LinksPageProps extends BlockProps {
  onLinkClick: (page: EPages) => void;
}

export class LinksPage extends Block {
  constructor({ onLinkClick }: LinksPageProps) {
    super({
      LinkAuthorization: new Link({
        content: 'Страница авторизации',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.authorization);
        },
      }),
      LinkChat: new Link({
        content: 'Страница чата',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.chat);
        },
      }),
      LinkRegistration: new Link({
        content: 'Страница регистрации',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.registration);
        },
      }),
      LinkSettings: new Link({
        content: 'Страница настроек',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.settings);
        },
      }),
      Link404: new Link({
        content: 'Страница ошибки 404',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.error500);
        },
      }),
      Link500: new Link({
        content: 'Страница ошибки 500',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.error404);
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
