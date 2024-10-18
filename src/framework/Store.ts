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
    case 'GET_CHATS': {
      const data = await new HTTPTransport().get(ENDPOINTS.chats);

      if (data) {
        newState.chats = data;
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
