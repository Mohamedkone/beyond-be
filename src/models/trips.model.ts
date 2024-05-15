import {Entity, model, property} from '@loopback/repository';

@model()
export class Trips extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  sDate: string;

  @property({
    type: 'date',
    required: true,
  })
  eDate: string;

  @property({
    type: 'object',
    required: true,
  })
  destination: object;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  constructor(data?: Partial<Trips>) {
    super(data);
  }
}

export interface TripsRelations {
  // describe navigational properties here
}

export type TripsWithRelations = Trips & TripsRelations;
