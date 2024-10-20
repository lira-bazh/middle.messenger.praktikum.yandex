import { Block } from '.';
import { cloonDeep } from '@/shared/mydash/clonDeep';
import { IStore, BlockProps } from '@/types';

type SubscribeFn = (state: IStore) => void;

const reducer = (state: IStore, action: Record<string, any>): IStore => {
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
        newState.user.avatar = action.data;
      }
      break;
    }
    case 'GET_CHATS': {
      newState.chats = action.data;
      break;
    }
    case 'CREATE_CHAT': {
      newState.chats.push({
        id: action.data.id,
        title: action.data.title,
        avatar: null,
        unread_count: 0,
        last_message: null,
        created_by: newState.user?.id,
      });
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
        newState.chats = newState.chats.filter(chat => chat.id !== chatId);
      }
      break;
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
    dispatch: (action: Record<string, any>) => {
      currentState = reducerFn(currentState, action);
      subscribers.forEach(fn => fn(currentState));
    },
  };
};

const initialState: IStore = {
  user: undefined,
  chats: [],
  selectedChat: undefined,
};

export const store = Object.freeze(createStore(reducer, initialState));

export function connect(Component: typeof Block, mapStateToProps: (state: IStore) => IStore) {
  // используем class expression
  return class extends Component {
    constructor(props: BlockProps) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.subscribe(state => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...mapStateToProps(state) });
      });
    }
  };
}
