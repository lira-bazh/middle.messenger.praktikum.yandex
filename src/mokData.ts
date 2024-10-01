import { LinkProps } from './types';

export const linksPageContent: LinkProps[] = [
  {
    id: 'to-authorization',
    content: 'Страница авторизации',
    onClick: e => {
      e.preventDefault();
    },
  },
  {
    id: 'to-registration',
    content: 'Страница регистрации',
    onClick: e => {
      e.preventDefault();
    },
  },
  {
    id: 'to-chat',
    content: 'Страница чата',
    onClick: e => {
      e.preventDefault();
    },
  },
  {
    id: 'to-settings',
    content: 'Страница настроек',
    onClick: e => {
      e.preventDefault();
    },
  },
  {
    id: 'to-404',
    content: 'Страница ошибки 404',
    onClick: e => {
      e.preventDefault();
    },
  },
  {
    id: 'to-500',
    content: 'Страница ошибки 500',
    onClick: e => {
      e.preventDefault();
    },
  },
];