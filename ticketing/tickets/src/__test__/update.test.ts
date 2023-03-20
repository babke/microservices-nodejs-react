import request from 'supertest';
import { app } from '../app';
import mongoose, { mongo } from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'title', price: 10 })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'title', price: 10 })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'ticket',
      price: 10,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'ticket2',
      price: 20,
    })
    .expect(401);

  const resp2 = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .expect(200);

  expect(resp2.body.title).toEqual('ticket');
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'ticket',
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'fdsafd',
      price: -10,
    })
    .expect(400);
});

it('it updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'ticket',
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new ticketname',
      price: 25,
    })
    .expect(200);

  const resp2 = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(resp2.body.title).toEqual('new ticketname');
  expect(resp2.body.price).toEqual(25);
});
