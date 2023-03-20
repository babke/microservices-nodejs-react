import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  const opts = stan
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true);

  const subs = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    opts
  );

  subs.on('message', (msg: Message) => {
    console.log(
      'Message received: [#' + msg.getSequence() + '] ' + msg.getData()
    );
    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
