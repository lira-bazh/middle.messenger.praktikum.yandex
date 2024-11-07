import { expect } from 'chai';
import { HTTPTransport } from './request';
import { ENDPOINTS } from '@/constants';

describe('Тестирование модуля отправки запросов', () => {
  it('Запрос прошёл успешно', async () => {
    const result = await new HTTPTransport().post<string>(ENDPOINTS.signin, {
      data: {
        login: 'LiraTest',
        password: 'test55Test',
      },
    });

    expect(result).to.be.eq('OK');
  });
});
