import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with invalid email signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtext.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with invalid password signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
      password: 'prd',
    })
    .expect(400);
});

it('returns a 400 with missing email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
    })
    .expect(400);
});

it('does not allow signup with existing email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@text.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
