import {Entity, model, property} from '@loopback/repository';

@model()
export class Onboarding extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  stage: number;


  constructor(data?: Partial<Onboarding>) {
    super(data);
  }
}

export interface OnboardingRelations {
  // describe navigational properties here
}

export type OnboardingWithRelations = Onboarding & OnboardingRelations;
