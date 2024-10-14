export type EventCallback = (...args: any[]) => void;

export type BlockProps = Record<string, any>;

export enum EPages {
  default = '/',
  registration = '/sign-up',
  chat = '/messenger',
  settings = '/settings',
  error500 = '/500',
  error404 = '/404',
}
