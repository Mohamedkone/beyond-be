import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Trips} from './trips.model';

@model()
export class Checklist extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Trips, {keyFrom: 'tripId', keyTo: 'id'})
  tripId: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  checklist: object[];

  @property({
    type: 'date',
    required: true,
  })
  lastUpdate: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  constructor(data?: Partial<Checklist>) {
    super(data);
  }
}

export interface ChecklistRelations {
  // describe navigational properties here
  trip?: Trips;
}

export type ChecklistWithRelations = Checklist & ChecklistRelations;
