import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'beyond',
  connector: 'mysql',
  host: 'beyondb-test-2.cfzp2jfcj8vp.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'test',
  password: 'Luffy1999',
  database: 'beyond'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BeyondDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'beyond';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.beyond', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
