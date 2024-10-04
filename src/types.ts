export type EventCallback = (...args: any[]) => void;

export type BlockProps = Record<string, any>;

export enum EPages {
  links = 'links',
  authorization = 'authorization',
  registration = 'registration',
  chat = 'chat',
  settings = 'settings',
  error500 = '500',
  error404 = '404',
}
