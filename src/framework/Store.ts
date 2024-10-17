import { cloonDeep } from '../utils/mydash/clonDeep';
import { HTTPTransport } from '../helpers/request';
import { ENDPOINTS } from '../constants';
import { IStore, EPages } from '../types';

type SubscribeFn = (state: IStore) => void;

const reducer = async (state: IStore, action: Record<string, any>): Promise<IStore> => {
  const newState: IStore = cloonDeep(state);
  switch (action.type) {
    case 'SIGNIN': {
      await new HTTPTransport().post(ENDPOINTS.signin, { data: action.data });
      break;
    }
    case 'SIGNUP': {
      await new HTTPTransport().post(ENDPOINTS.signup, { data: action.data });
      break;
    }
    case 'GET_USER': {
      if (!newState.user) {
        try {
          const { data } = await new HTTPTransport().get(ENDPOINTS.auth);

          if (data) {
            newState.user = data;
          }
        } catch {
          action.changePage(EPages.default);
        }
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
};

export const store = Object.freeze(createStore(reducer, initialState));

