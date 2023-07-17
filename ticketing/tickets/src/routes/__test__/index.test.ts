import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: title,
    price: price,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket('1st ticket', 10);
  await createTicket('2nd ticket', 20);
  await createTicket('2nd ticket', 20);

  const response = await request(app).get('/api/tickets').expect(200);

  expect(response.body.length).toEqual(3);
});
