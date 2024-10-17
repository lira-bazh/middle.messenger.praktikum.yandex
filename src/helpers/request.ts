import { REQUEST_STATUSES } from '../constants';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IOptions {
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: URLSearchParams | Record<string, number | string | object | unknown[]>;
  tries?: number;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type HTTPMethod = (url: string, options?: IOptions) => Promise<any | Error>;

function queryStringify(data: Record<string, number | string | object | unknown[]> | URLSearchParams): string {
  if (!Object.keys(data).length || data instanceof URLSearchParams) {
    return '';
  }

  return `?${Object.keys(data)
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    .map(key => `${key}=${data[key].toString()}`)
    .join('&')}`;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const handleError = async (request: Promise<XMLHttpRequest>): Promise<any | Error> => {
  const result: XMLHttpRequest = await request;

  if (result.status !== REQUEST_STATUSES.OK) {
    throw new Error(result.response);
  }

  return result.response;
};

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return handleError(this.request(url, { ...options, method: METHODS.GET }, options.timeout));
  };

  post: HTTPMethod = (url, options = {}) => {
    return handleError(this.request(url, { ...options, method: METHODS.POST }, options.timeout));
  };

  put: HTTPMethod = (url, options = {}) => {
    return handleError(this.request(url, { ...options, method: METHODS.PUT }, options.timeout));
  };

  delete: HTTPMethod = (url, options = {}) => {
    return handleError(this.request(url, { ...options, method: METHODS.DELETE }, options.timeout));
  };

  request = (url: string, options: IOptions = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data, headers = {} } = options;

    if (!method) {
      return Promise.reject(new Error('No method'));
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url);
      xhr.withCredentials = true;

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export function fetchWithRetry(url: string, options: IOptions = { tries: 1 }) {
  const { tries = 1 } = options;

  function onError(err: Error): Promise<unknown> {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return new HTTPTransport().get(url, options).catch(onError);
}
