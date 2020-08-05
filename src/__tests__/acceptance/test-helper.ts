import {DoctorCaseLabelApplication} from '../..';
import {
  Client,
} from '@loopback/testlab';
import {ExpressServer} from '../../server';

export async function setupApplication(): Promise<ExpressServer> {

  const app = new ExpressServer({
  });

  await app.boot();
  await app.start();

  return app;

}

