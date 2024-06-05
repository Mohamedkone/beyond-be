import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Onboarding} from '../models';
import {OnboardingRepository} from '../repositories';

export class OnboardingController {
  constructor(
    @repository(OnboardingRepository)
    public onboardingRepository : OnboardingRepository,
  ) {}

  @post('/onboardings')
  @response(200, {
    description: 'Onboarding model instance',
    content: {'application/json': {schema: getModelSchemaRef(Onboarding)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Onboarding, {
            title: 'NewOnboarding',
            
          }),
        },
      },
    })
    onboarding: Onboarding,
  ): Promise<Onboarding> {
    return this.onboardingRepository.create(onboarding);
  }

  @get('/onboardings/count')
  @response(200, {
    description: 'Onboarding model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Onboarding) where?: Where<Onboarding>,
  ): Promise<Count> {
    return this.onboardingRepository.count(where);
  }

  @get('/onboardings')
  @response(200, {
    description: 'Array of Onboarding model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Onboarding, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Onboarding) filter?: Filter<Onboarding>,
  ): Promise<Onboarding[]> {
    return this.onboardingRepository.find(filter);
  }

  @patch('/onboardings')
  @response(200, {
    description: 'Onboarding PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Onboarding, {partial: true}),
        },
      },
    })
    onboarding: Onboarding,
    @param.where(Onboarding) where?: Where<Onboarding>,
  ): Promise<Count> {
    return this.onboardingRepository.updateAll(onboarding, where);
  }

  @get('/onboardings/{id}')
  @response(200, {
    description: 'Onboarding model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Onboarding, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Onboarding, {exclude: 'where'}) filter?: FilterExcludingWhere<Onboarding>
  ): Promise<Onboarding> {
    return this.onboardingRepository.findById(id, filter);
  }

  @patch('/onboardings/{id}')
  @response(204, {
    description: 'Onboarding PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Onboarding, {partial: true}),
        },
      },
    })
    onboarding: Onboarding,
  ): Promise<void> {
    await this.onboardingRepository.updateById(id, onboarding);
  }

  @put('/onboardings/{id}')
  @response(204, {
    description: 'Onboarding PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() onboarding: Onboarding,
  ): Promise<void> {
    await this.onboardingRepository.replaceById(id, onboarding);
  }

  @del('/onboardings/{id}')
  @response(204, {
    description: 'Onboarding DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.onboardingRepository.deleteById(id);
  }
}
