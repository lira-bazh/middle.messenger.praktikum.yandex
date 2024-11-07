import { cloonDeep } from '@/shared/mydash/cloonDeep';
import { IStore } from '@/types';

type SubscribeFn = (state: IStore) => void;
type ActionType = Record<string, any>;

const INITIAL_STATE: IStore = {
  user: undefined,
  chats: undefined,
  selectedChat: undefined,
  messages: undefined,
};

const reducer = (state: IStore, action: ActionType): IStore => {
  const newState: IStore = cloonDeep(state);
  switch (action.type) {
    case 'GET_USER': {
      newState.user = action.data;
      break;
    }
    case 'CHANGE_PROFILE': {
      newState.user = action.data;
      break;
    }
    case 'CHANGE_PROFILE_IMG': {
      if (newState.user) {
        newState.user.avatar = action.data.avatar;
      }
      break;
    }
    case 'GET_CHATS': {
      newState.chats = action.data;
      break;
    }
    case 'CREATE_CHAT': {
      if (newState.chats) {
        newState.chats.push({
          id: action.data.id,
          title: action.title,
          avatar: null,
          unread_count: 0,
          last_message: null,
          created_by: newState.user?.id,
          users: undefined,
        });
      }
      break;
    }
    case 'SELECT_CHAT': {
      newState.selectedChat = action.chat;
      break;
    }
    case 'CLOSE_SELECTED_CHAT': {
      newState.selectedChat = undefined;
      break;
    }
    case 'REMOVE_SELECTED_CHAT': {
      if (newState.selectedChat) {
        const chatId = newState.selectedChat.id;
        newState.selectedChat = undefined;
        if (newState.chats) {
          newState.chats = newState.chats.filter(chat => chat.id !== chatId);
        }
      }
      break;
    }
    case 'ADD_MESSAGES': {
      if (Array.isArray(action.data)) {
        newState.messages = action.data.reverse();
      } else if (Array.isArray(newState.messages)) {
        newState.messages.push(action.data);
      }
      break;
    }
    case 'UPDATE_USERS_BY_CHAT': {
      if (Array.isArray(action.data) && newState.selectedChat) {
        newState.selectedChat.users = action.data;
      }
      break;
    }
    case 'UPDATE_CHAT_AVATAR': {
      if (newState.selectedChat) {
        newState.selectedChat.avatar = action.data.avatar;
      }

      if (newState.chats) {
        newState.chats = newState.chats.map(chat => {
          if (chat.id === newState.selectedChat?.id) {
            chat.avatar = action.data.avatar;
          }
          return chat;
        });
      }
      break;
    }
    case 'CLEAR_STORE': {
      return INITIAL_STATE;
    }
  }
  return newState;
};

const createStore = (reducerFn: typeof reducer, initialState: IStore) => {
  const subscribers: SubscribeFn[] = [];
  let currentState: IStore = initialState;

  return {
    getState: () => currentState,
    subscribe: (fn: SubscribeFn) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: ActionType) => {
      currentState = reducerFn(currentState, action);
      subscribers.forEach(fn => fn(currentState));
    },
  };
};

export const store = Object.freeze(createStore(reducer, INITIAL_STATE));
