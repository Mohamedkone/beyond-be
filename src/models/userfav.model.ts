import {Entity, model, property} from '@loopback/repository';

@model()
export class Userfav extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  userId: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  favCountry: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  travStyle: string[];


  constructor(data?: Partial<Userfav>) {
    super(data);
  }
}

export interface UserfavRelations {
  // describe navigational properties here
}

export type UserfavWithRelations = Userfav & UserfavRelations;
