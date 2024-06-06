import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config()

const config = {
  name: process.env.MYSQL_NAME ?? 'beyond',
  connector: process.env.MYSQL_connector ?? 'mysql',
  host: process.env.MYSQL_HOST ?? 'db-mysql-nyc3-14479-do-user-16856727-0.c.db.ondigitalocean.com',
  port: process.env.MYSQL_PORT ?? 25060,
  user: process.env.MYSQL_USER ?? 'doadmin',
  password: process.env.MYSQL_PASSWORD ?? 'AVNS_urFIZAyXYSU_G50cVd5',
  database: process.env.MYSQL_DATABASE ?? 'beyond'
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
