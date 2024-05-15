import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeyondDataSource} from '../datasources';
import {Notes, NotesRelations} from '../models';

export class NotesRepository extends DefaultCrudRepository<
  Notes,
  typeof Notes.prototype.id,
  NotesRelations
> {
  constructor(
    @inject('datasources.beyond') dataSource: BeyondDataSource,
  ) {
    super(Notes, dataSource);
  }
}
