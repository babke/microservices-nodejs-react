import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

// for actual stripe testing - comment out for mock testing
process.env.STRIPE_KEY =
  'sk_test_51OfhytDy1pQTbjbydOYdtWOQ0RZedxBaLkVXpyGkyG1tDXPQR7fuIIMSzC8Lo4RIPIJDXpWbhDNY97Z2MIgqRH3W00e7vzobMQ';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'something';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // create the session OBject {jwt: MY_JWT}
  const session = { jwt: token };

  // turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // take JSON and endoce it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return string as encoded data
  return [`session=${base64}`];
};
