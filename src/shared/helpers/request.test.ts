import { expect } from 'chai';
import { HTTPTransport } from './request';
import { ENDPOINTS } from '@/constants';

describe('Тестирование модуля отправки запросов', () => {
  it('Запрос прошёл успешно', async () => {
    const result = await new HTTPTransport().get<string>(ENDPOINTS.auth).catch(error => error.message);
    const parseRes = JSON.parse(result);

    expect(parseRes.reason).to.be.eq('Cookie is not valid');
  });
});
