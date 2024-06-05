import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config()

const config = {
  name: 'beyond',
  connector: 'mysql',
  host: 'db-mysql-nyc3-14479-do-user-16856727-0.c.db.ondigitalocean.com',
  port: 25060,
  user: 'doadmin',
  password: 'AVNS_urFIZAyXYSU_G50cVd5',
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
