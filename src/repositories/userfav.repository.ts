import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeyondDataSource} from '../datasources';
import {Userfav, UserfavRelations} from '../models';

export class UserfavRepository extends DefaultCrudRepository<
  Userfav,
  typeof Userfav.prototype.userId,
  UserfavRelations
> {
  constructor(
    @inject('datasources.beyond') dataSource: BeyondDataSource,
  ) {
    super(Userfav, dataSource);
  }
}
