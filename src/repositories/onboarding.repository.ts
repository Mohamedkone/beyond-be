import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BeyondDataSource} from '../datasources';
import {Onboarding, OnboardingRelations} from '../models';

export class OnboardingRepository extends DefaultCrudRepository<
  Onboarding,
  typeof Onboarding.prototype.id,
  OnboardingRelations
> {
  constructor(
    @inject('datasources.beyond') dataSource: BeyondDataSource,
  ) {
    super(Onboarding, dataSource);
  }
}
