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

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
  avatar: string;
}

export interface IStore {
  user: IUser | undefined;
}