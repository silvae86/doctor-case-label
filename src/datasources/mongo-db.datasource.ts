import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDB',
  connector: 'mongodb',
  url:
    'mongodb://admin:34857q98efhlajwehrlaeroiu2yq3948q2uweoiqwherluqywioerqhw0p92874983724rhqwelrhqweiuryoiqwerhlqwhjeflkawejrp9023475823y4rjhelkjrheiouryi@localhost:27019/DoctorCaseLabel',
  host: 'localhost',
  port: 27019,
  user: 'admin',
  password:
    '34857q98efhlajwehrlaeroiu2yq3948q2uweoiqwherluqywioerqhw0p92874983724rhqwelrhqweiuryoiqwerhlqwhjeflkawejrp9023475823y4rjhelkjrheiouryi',
  database: 'DoctorCaseLabel',
  useNewUrlParser: true,
  authSource: "admin"
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
