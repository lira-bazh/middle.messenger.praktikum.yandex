enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, number | string | object | unknown[]> | URLSearchParams): string {
  if (!Object.keys(data).length || data instanceof URLSearchParams) {
    return '';
  }

  return `?${Object.keys(data)
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    .map(key => `${key}=${data[key].toString()}`)
    .join('&')}`;
}

interface IOptions {
  method?: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: URLSearchParams | Record<string, number | string | object | unknown[]>;
  tries?: number;
}

export class HTTPTransport {
  get = (url: string, options: IOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: IOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: IOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: IOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: IOptions = { method: METHODS.GET }, timeout = 5000) => {
    const { method, data, headers = {} } = options;

    if (!method) {
      return Promise.reject(new Error('No method'));
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url);

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
      } else if (data instanceof URLSearchParams) {
        xhr.send(data);
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
