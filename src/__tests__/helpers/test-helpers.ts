import {DoctorCaseLabelApplication} from "../../../src/application";
import {
  createRestAppClient,
  Client,
} from '@loopback/testlab';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function setupApplication(): Promise<AppWithClient> {

  const app = new DoctorCaseLabelApplication();
  app.bind('datasources.config.mongodb').to({
    name: 'mongodb',
    connector: 'memory',
    debug: true,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: DoctorCaseLabelApplication;
  client: Client;
}
