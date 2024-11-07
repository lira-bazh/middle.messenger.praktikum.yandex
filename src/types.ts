export type EventCallback = (...args: unknown[]) => void;

export type BlockProps = Record<string, any>;

export enum EPages {
  default = '/',
  registration = '/sign-up',
  messenger = '/messenger',
  settings = '/settings',
  password = '/change-password',
  selectUser = '/select-user',
  usersInChat = '/users-in-chat',
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
  avatar: string | null;
}

export interface IMessage {
  time: string;
  user_id: number;
  content: string;
}

export interface ILastMessage {
  time: string;
  user: IUser;
  content: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: ILastMessage | null;
  created_by: number | undefined;
  users: IUser[] | undefined;
}

export interface IStore {
  user: IUser | undefined;
  chats: IChat[] | undefined;
  selectedChat: IChat | undefined;
  messages: IMessage[] | undefined;
}

export type RequestData = Record<string, string | number | object | unknown[] | undefined>;
