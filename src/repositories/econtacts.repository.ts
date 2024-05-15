import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeyondDataSource} from '../datasources';
import {Econtacts, EcontactsRelations} from '../models';

export class EcontactsRepository extends DefaultCrudRepository<
  Econtacts,
  typeof Econtacts.prototype.id,
  EcontactsRelations
> {
  constructor(
    @inject('datasources.beyond') dataSource: BeyondDataSource,
  ) {
    super(Econtacts, dataSource);
  }
}
