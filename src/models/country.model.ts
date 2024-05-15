import {Entity, model, property} from '@loopback/repository';

@model()
export class Country extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
  })
  risklevel: number;

  @property({
    type: 'string',
    required: true,
  })
  pubDate: string;

  @property({
    type: 'string',
    required: true,
  })
  govlink: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  iso: string;


  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
