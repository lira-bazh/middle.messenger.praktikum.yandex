import { Block } from './';
import { cloonDeep } from '../utils/mydash/clonDeep';
import { HTTPTransport } from '../helpers/request';
import { ENDPOINTS } from '../constants';
import { IStore, EPages, BlockProps } from '../types';

type SubscribeFn = (state: IStore) => void;

const reducer = async (state: IStore, action: Record<string, any>): Promise<IStore> => {
  const newState: IStore = cloonDeep(state);
  switch (action.type) {
    case 'GET_USER': {
      if (!newState.user) {
        try {
          const data = await new HTTPTransport().get(ENDPOINTS.auth);

          if (data) {
            newState.user = data;
          }
        } catch {
          action.changePage(EPages.default);
        }
      }
      break;
    }
    case 'CHANGE_PROFILE': {
      const data = await new HTTPTransport().put(ENDPOINTS.changeProfile, { data: action.data });

      if (data) {
        newState.user = data;
      }
      break;
    }
    case 'CHANGE_PROFILE_IMG': {
      const sendData = new FormData();
      sendData.append('avatar', action.avatar);
      //@ts-expect-error типа data не соответствует
      const data = await new HTTPTransport().put(ENDPOINTS.changeProfileAvatar, { data: sendData });

      if (data) {
        console.log('data', data);
      }

      break;
    }
    case 'GET_CHATS': {
      const data = await new HTTPTransport().get(ENDPOINTS.chats);

      if (data) {
        newState.chats = data;
      }
      break;
    }
    case 'CREATE_CHAT': {
      const data = await new HTTPTransport().post(ENDPOINTS.chats, { data: action.data });

      if (data) {
        newState.chats.push({
          id: data.id,
          title: action.data.title,
          avatar: null,
          unread_count: 0,
          last_message: null,
          created_by: newState.user?.id,
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
        await new HTTPTransport().delete(ENDPOINTS.chats, { data: { chatId } });

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
    dispatch: async (action: Record<string, any>) => {
      currentState = await reducerFn(currentState, action);
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
