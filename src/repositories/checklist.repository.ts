import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Checklist, ChecklistRelations, Trips} from '../models';
import {BeyondDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TripsRepository} from './trips.repository';

export class ChecklistRepository extends DefaultCrudRepository<
  Checklist,
  typeof Checklist.prototype.id,
  ChecklistRelations
> {
  public readonly trip: BelongsToAccessor<Trips, typeof Checklist.prototype.id>;

  constructor(
    @inject('datasources.beyond') dataSource: BeyondDataSource,
    @repository.getter('TripsRepository')
    protected tripsRepositoryGetter: Getter<TripsRepository>,
  ) {
    super(Checklist, dataSource);
    this.trip = this.createBelongsToAccessorFor('trip', tripsRepositoryGetter);
    this.registerInclusionResolver('trip', this.trip.inclusionResolver);
  }
}
