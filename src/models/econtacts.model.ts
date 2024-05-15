import {Entity, model, property} from '@loopback/repository';

@model()
export class Econtacts extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  contacts: object[];


  constructor(data?: Partial<Econtacts>) {
    super(data);
  }
}

export interface EcontactsRelations {
  // describe navigational properties here
}

export type EcontactsWithRelations = Econtacts & EcontactsRelations;
