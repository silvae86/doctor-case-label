import {Client} from '@loopback/testlab';
import {setupApplication} from './test-helper';
import {ExpressServer} from '../../server';

describe('HomePage', () => {
  let app: ExpressServer;
  let client: Client;

  before('setupApplication', async () => {
    (app = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });
});
