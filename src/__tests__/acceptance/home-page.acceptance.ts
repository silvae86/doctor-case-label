const request = require('supertest');
import {setupApplication} from './test-helper';
import {ExpressServer} from '../../server';

describe('HomePage', () => {
  let app: ExpressServer;

  before('setupApplication', async () => {
    app = await setupApplication();
    return;
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await request(app.server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });
});
