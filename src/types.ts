export type EventCallback = (...args: any[]) => void;

export type BlockProps = Record<string, any>;

export enum EPages {
  default = '/',
  registration = '/sign-up',
  messenger = '/messenger',
  settings = '/settings',
  password = '/change-password',
  error500 = '/500',
  error404 = '/404',
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
  avatar: string;
}

export interface IMessage {
  time: string;
  user: IUser;
  content: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: IMessage;
}

export interface IStore {
  user: IUser | undefined;
  chats: any[];
}