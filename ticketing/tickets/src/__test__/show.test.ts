import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';

it('return 404 if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('returns the ticket if it is found', async () => {
  const ticketTitle = 'Just a ticket';
  const ticketPrice = 17.95;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: ticketTitle,
      price: ticketPrice,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(ticketTitle);
  expect(ticketResponse.body.price).toEqual(ticketPrice);
});
