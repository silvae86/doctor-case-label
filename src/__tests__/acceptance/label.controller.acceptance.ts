import {Client, expect} from '@loopback/testlab';
import {DoctorCaseLabelApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: DoctorCaseLabelApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /label', async () => {


    const res = await client.post('/label/?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
